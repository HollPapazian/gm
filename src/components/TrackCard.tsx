import { useContext } from "react";
import { FormattedTrackObject } from "../types";
import { useGetPlaceByCord } from "../utils";
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
  const startPoint = formattedTrackObj?.trackData.path[0];
  const finishPoint = formattedTrackObj?.trackData.path[formattedTrackObj?.trackData.path.length - 1];
  const placeStart = useGetPlaceByCord(startPoint?.[0], startPoint?.[1]);
  const placeFinish = useGetPlaceByCord(finishPoint?.[0], finishPoint?.[1]);
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
      {(placeStart || placeFinish) && (
        <div>
          <span>Track</span>
          <span>
            {placeStart} - {placeFinish}
          </span>
        </div>
      )}
    </button>
  );
};
