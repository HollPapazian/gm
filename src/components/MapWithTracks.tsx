import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { TripsLayer } from "@deck.gl/geo-layers/typed";
import { MAPBOX_API_KEY, MAPBOX_STYLE } from "../config";
import { TrackLayerData } from "../types";
import { getInitMapState, useGetCenter, useGetPOI } from "../utils";
import { useCallback, useEffect, useState } from "react";
import { MapControls } from "./MapControls";
import { IconLayer } from "@deck.gl/layers/typed";

const INTERVAL_IN_MS = 50;

let intervalId: number | undefined;

export const MapWithTracks = ({
  data,
  mapCenter,
}: {
  data: TrackLayerData;
  mapCenter?: [number, number];
}) => {
  const loopLength = data.timestamps[data.timestamps.length - 1];
  const [time, setTime] = useState(loopLength);
  const [isAnimated, setIsAnimated] = useState(false);
  const [step, setStep] = useState(20);
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

  const pois = useGetPOI(data.path[0][0], data.path[0][1]);

  const layers = [
    new TripsLayer({
      id: "trips",
      data: [data],
      getPath: (d) => d.path,
      getTimestamps: (d) =>
        d.timestamps.map((timestamp: number) => timestamp - data.timestamps[0]),
      getColor: (d) => [123, 31, 162],
      opacity: 0.2,
      widthMinPixels: 3,
      rounded: true,
      shadowEnabled: false,
      fadeTrail: isAnimated,
      trailLength: loopLength * 0.2,
      currentTime: time,
    }),
    new IconLayer({
      id: "icon-layer",
      data: pois,
      pickable: true,
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping: {
        marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
      },
      getIcon: (d) => "marker",
      sizeScale: 8,
      getPosition: (d) => d.center,
      getSize: (d) => 3,
      getColor: (d) => [255, 0, 0],
      onClick: (e) => {
        console.log("e: ", e);
      },
    }),
  ];

  const initState = getInitMapState({
    latitude: mapCenter?.[1] || (center && center.latitude) || 0,
    longitude: mapCenter?.[0] || (center && center.longitude) || 0,
    zoom: mapCenter ? 15 : 10,
  });
  return (
    <>
      <DeckGL initialViewState={initState} controller={true} layers={layers}>
        <Map mapboxAccessToken={MAPBOX_API_KEY} mapStyle={MAPBOX_STYLE} />
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
