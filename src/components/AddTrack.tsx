import { gpxToTrackLayerData } from "../utils";
import styles from "./AddTrack.module.scss";

export function AddTrack() {
  const handleChange = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e: any) => {
      window.localStorage.setItem(
        `track-${Math.random()}`,
        JSON.stringify(gpxToTrackLayerData(e.target.result))
      );
    };
  };
  return (
    <label className={styles["add-track-wrapper"]}>
      <input
        type="file"
        className={styles["add-track-input"]}
        onChange={handleChange}
      />
      <span>Add new track</span>
    </label>
  );
}
