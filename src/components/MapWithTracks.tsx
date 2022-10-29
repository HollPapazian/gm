import { Map, MapRef } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { TripsLayer } from "@deck.gl/geo-layers/typed";
import { MAPBOX_API_KEY } from "../config";
import { TrackLayerData } from "../types";
import { getInitMapState, useGetCenter } from "../utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { MapControls } from "./MapControls";

const INTERVAL_IN_MS = 20;

let intervalId: number | undefined;

export const MapWithTracks = ({ data }: { data: TrackLayerData }) => {
  const loopLength = data.timestamps[data.timestamps.length - 1];
  const mapRef = useRef<MapRef>(null);
  const [time, setTime] = useState(loopLength);
  const [isAnimated, setIsAnimated] = useState(false);
  const [step, setStep] = useState(10);
  const center = useGetCenter(data.path);
  const animate = useCallback(() => {
    if (isAnimated) {
      setTime((t) => (t + step) % loopLength);
    }
  }, [step, isAnimated, loopLength]);

  useEffect(() => {
    if (!isAnimated) {
      clearInterval(intervalId);
      return;
    }
    intervalId = window.setInterval(animate, INTERVAL_IN_MS);

    return () => clearInterval(intervalId);
  }, [isAnimated, animate, step]);

  useEffect(() => {
    setTime(data.timestamps[data.timestamps.length - 1]);
  }, [data.timestamps]);

  const layers = [
    new TripsLayer({
      id: "trips",
      data: [data],
      getPath: (d) => d.path,
      getTimestamps: (d) =>
        d.timestamps.map((timestamp: number) => timestamp - data.timestamps[0]),
      getColor: (d) => [255, 0, 0],
      opacity: 0.2,
      widthMinPixels: 3,
      rounded: true,
      shadowEnabled: false,
      fadeTrail: isAnimated,
      trailLength: loopLength * 0.2,
      currentTime: time,
    }),
  ];

  const initState = getInitMapState({
    latitude: center ? center.latitude : 0,
    longitude: center ? center.longitude : 0,
  });
  return (
    <>
      <DeckGL initialViewState={initState} controller={true} layers={layers}>
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_API_KEY}
          mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
        />
      </DeckGL>
      <MapControls
        step={step}
        setStep={setStep}
        isAnimated={isAnimated}
        setIsAnimated={setIsAnimated}
      />
    </>
  );
};
