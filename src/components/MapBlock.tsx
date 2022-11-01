import { TrackLayerData } from "../types";
import styles from "./MapBlock.module.scss";
import {
  TracksBlock,
  MapWithTracks,
  MapPlaceholder,
  TrackProvider,
  TrackContext,
  POIList,
} from "./";

import { useContext, useState } from "react";

export const MapBlock = ({ mapCenter }: { mapCenter?: [number, number] }) => {
  const { track } = useContext(TrackContext);
  return (
    <div className={styles["map-wrapper"]}>
      {track ? (
        <MapWithTracks
          mapCenter={mapCenter}
          data={track.trackData as TrackLayerData}
        />
      ) : (
        <MapPlaceholder />
      )}
    </div>
  );
};
