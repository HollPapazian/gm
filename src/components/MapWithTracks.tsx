import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { TripsLayer } from "@deck.gl/geo-layers/typed";
import { MAPBOX_API_KEY, MAPBOX_STYLE } from "../config";
import { TrackLayerData } from "../types";
import { getInitMapState } from "../utils";
import { useCallback, useEffect, useState } from "react";
import { MapControls } from "./MapControls";

const intervalMS = 20;
let interval: any = null;
export const MapWithTracks = ({
  data,
}: // isAnimated = true,
{
  data: TrackLayerData;
  // isAnimated?: boolean;
}) => {
  const [time, setTime] = useState(data.timestamps[data.timestamps.length - 1]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [step, setStep] = useState(10);
  // const [interval, setCurrentInterval] = useState(null);
  const loopLength = data.timestamps[data.timestamps.length - 1];
  const animate = useCallback(() => {
    if (isAnimated) {
      // increment time by "step" on each loop
      setTime((t) => (t + step) % loopLength);
    }
  }, [step, isAnimated, loopLength]);

  useEffect(() => {
    if (!isAnimated) {
      clearInterval(interval);
      return;
    }
    // start loop
    interval = setInterval(animate, intervalMS);
    // setCurrentInterval(currentInterval);

    return () => clearInterval(interval);
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
      fadeTrail: false,
      currentTime: time,
    }),
  ];

  const initState = getInitMapState({
    latitude: data.path[0][1],
    longitude: data.path[0][0],
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
