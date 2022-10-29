// import demoTrack from "./data/demoTrack.json";
// import { MapWithTracks } from "./components/MapWithTracks";
import { TrackLayerData } from "./types";
import { gpxToTrackLayerData } from "./utils";
import styles from "./App.module.scss";
import { TracksBlock, MapWithTracks } from "./components";
// let gpxParser = require('gpxparser');

function App() {
  console.log(gpxToTrackLayerData());
  return (
    <div className={styles.main}>
      <TracksBlock />
      <div className={styles["map-wrapper"]}>
        <MapWithTracks
          data={gpxToTrackLayerData().trackData as TrackLayerData}
        />
      </div>
    </div>
  );
}

export default App;
