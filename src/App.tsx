import styles from "./App.module.scss";
import { TracksBlock, TrackProvider, MapBlock, POIList } from "./components";
import { useState } from "react";

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
