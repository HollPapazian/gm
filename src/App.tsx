import { TrackLayerData } from "./types";
import styles from "./App.module.scss";
import {
  TracksBlock,
  MapWithTracks,
  MapPlaceholder,
  TrackProvider,
  TrackContext,
  MapBlock,
  POIList,
} from "./components";
import { useContext, useState } from "react";

function App() {
  const [poiCenter, setPoiCenter] = useState<[number, number] | undefined>(
    undefined
  );
  console.log("poiCenter: ", poiCenter);
  return (
    <TrackProvider>
      <div className={styles.main}>
        <TracksBlock />
        <div className={styles["map-and-poi-block"]}>
          <MapBlock mapCenter={poiCenter} />
          <POIList setPoiCenter={setPoiCenter} />
        </div>
      </div>
    </TrackProvider>
  );
}

export default App;
