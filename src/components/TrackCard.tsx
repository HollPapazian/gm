import { useContext } from "react";
import { FormattedTrackObject } from "../types";
import styles from "./TrackCard.module.scss";
import { TrackContext } from "./TrackContext";

export const TrackCard = ({
  formattedTrackObj,
  className,
}: {
  formattedTrackObj: FormattedTrackObject;
  className?: string;
}) => {
  const { track, setTrack } = useContext(TrackContext);
  return (
    <button
      className={`${styles["track-card"]} ${className && styles[className]} ${
        track?.id === formattedTrackObj.id && styles["track-card--active"]
      }`}
      onClick={() => setTrack(formattedTrackObj)}
    >
      <div>
        <span>Name</span>
        <span>{formattedTrackObj.name}</span>
      </div>
      <div>
        <span>Total Distance</span>
        <span>{formattedTrackObj.totalDistance.toFixed(2)} km</span>
      </div>
    </button>
  );
};
