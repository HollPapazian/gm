import { FormattedTrackObject, TrackLayerData } from "../types";
import style from "./TrackCard.module.scss";
export const TrackCard = ({
  name,
  totalDistance,
  trackData,
  setTrack,
}: FormattedTrackObject & {
  setTrack: React.Dispatch<React.SetStateAction<TrackLayerData | null>>;
}) => (
  <button className={style["track-card"]} onClick={() => setTrack(trackData)}>
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
