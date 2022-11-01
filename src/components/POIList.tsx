import { useContext, useEffect } from "react";
import { useGetPOI } from "../utils";
import { TrackContext } from "./TrackContext";
import styles from "./POIList.module.scss";

export const POIList = ({
  setPoiCenter,
}: {
  setPoiCenter: React.Dispatch<
    React.SetStateAction<[number, number] | undefined>
  >;
}) => {
  const { track } = useContext(TrackContext);
  const pois = useGetPOI(
    track?.trackData.path[0][0],
    track?.trackData.path[0][1]
  );
  useEffect(() => {
    return () => {
      setPoiCenter(undefined);
    };
  }, [setPoiCenter, track]);
  return (
    <ul className={styles["poi-list"]}>
      {pois.length ? (
        pois.map((poi) => (
          <li key={poi.name}>
            <button onClick={() => setPoiCenter(poi.center)}>{poi.name}</button>
          </li>
        ))
      ) : (
        <div>Chose your track or select demo</div>
      )}
    </ul>
  );
};
