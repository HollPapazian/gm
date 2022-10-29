import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { TripsLayer } from "@deck.gl/geo-layers/typed";
import { MAPBOX_API_KEY, MAPBOX_STYLE } from "../config";
import { TrackLayerData } from "../types";
import { getInitMapState } from "../utils";

export const MapWithTracks = ({ data }: { data: TrackLayerData[] }) => {
  const layers = [
    new TripsLayer({
      id: "trips",
      data,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => [255, 0, 0],
      opacity: 0.2,
      widthMinPixels: 3,
      rounded: true,
      shadowEnabled: false,
      fadeTrail: false,
      currentTime: 400,
    }),
  ];

  const initState = getInitMapState({
    latitude: data[0].path[0][1],
    longitude: data[0].path[0][0],
  });
  return (
    <DeckGL initialViewState={initState} controller={true} layers={layers}>
      <Map mapboxAccessToken={MAPBOX_API_KEY} mapStyle={MAPBOX_STYLE} />
    </DeckGL>
  );
};
