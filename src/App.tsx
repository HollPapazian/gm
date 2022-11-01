import { TrackLayerData } from "./types";
import styles from "./App.module.scss";
import {
  TracksBlock,
  MapWithTracks,
  MapPlaceholder,
  TrackProvider,
  TrackContext,
} from "./components";
import { useContext, useState } from "react";

const MapBlock = () => {
  const { track } = useContext(TrackContext);
  return (
    <div className={styles["map-wrapper"]}>
      {track ? (
        <MapWithTracks data={track.trackData as TrackLayerData} />
      ) : (
        <MapPlaceholder />
      )}
    </div>
  );
};

function App() {
  return (
    <TrackProvider>
      <div className={styles.main}>
        <TracksBlock />
        <MapBlock />
      </div>
    </TrackProvider>
  );
}

export default App;
