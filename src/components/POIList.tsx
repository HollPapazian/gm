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
  }, [track]);
  return (
    <ul className={styles["poi-list"]}>
      {pois.map((poi) => (
        <li>
          <button onClick={() => setPoiCenter(poi.center)}>{poi.name}</button>
        </li>
      ))}
    </ul>
  );
};
