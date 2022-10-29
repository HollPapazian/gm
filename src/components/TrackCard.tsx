import { FormattedTrackObject, TrackLayerData } from "../types";
import styles from "./TrackCard.module.scss";

export const TrackCard = ({
  name,
  totalDistance,
  trackData,
  setTrack,
  className,
}: FormattedTrackObject & {
  setTrack: React.Dispatch<React.SetStateAction<TrackLayerData | null>>;
  className?: string;
}) => (
  <button
    className={`${styles["track-card"]} ${className && styles[className]}`}
    onClick={() => setTrack(trackData)}
  >
    <div>
      <span>Name</span>
      <span>{name}</span>
    </div>
    <div>
      <span>Total Distance</span>
      <span>{totalDistance.toFixed(2)} km</span>
    </div>
  </button>
);
