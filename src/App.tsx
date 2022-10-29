// import demoTrack from "./data/demoTrack.json";
import { MapWithTracks } from "./components/MapWithTracks";
import { TrackLayerData } from "./types";
import { gpxToTrackLayerData } from "./utils";
import styles from "./App.module.scss";
// let gpxParser = require('gpxparser');

function App() {
  console.log(gpxToTrackLayerData());
  return (
    <div className={styles.main}>
      <div className={styles["map-wrapper"]}>
        <MapWithTracks data={gpxToTrackLayerData() as TrackLayerData[]} />;
      </div>
    </div>
  );
}

export default App;
