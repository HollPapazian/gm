import { TrackLayerData } from "../types";
import styles from "./MapBlock.module.scss";
import {
  MapWithTracks,
  MapPlaceholder,
  TrackContext
} from "./";

import { useContext } from "react";

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
