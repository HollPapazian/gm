// import demoTrack from "./data/demoTrack.json";
// import { MapWithTracks } from "./components/MapWithTracks";
import { TrackLayerData } from "./types";
// import { gpxToTrackLayerData } from "./utils";
import styles from "./App.module.scss";
import { TracksBlock, MapWithTracks, MapPlaceholder } from "./components";
import { useState } from "react";
// let gpxParser = require('gpxparser');

function App() {
  const [track, setTrack] = useState<TrackLayerData | null>(null);
  return (
    <div className={styles.main}>
      <TracksBlock setTrack={setTrack} />
      <div className={styles["map-wrapper"]}>
        {track ? (
          <MapWithTracks data={track as TrackLayerData} />
        ) : (
          <MapPlaceholder />
        )}
      </div>
    </div>
  );
}

export default App;
