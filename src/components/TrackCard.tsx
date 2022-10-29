import { FormattedTrackObject } from "../types";
import style from './TrackCard.module.scss'
export const TrackCard = ({
  name,
  totalDistance,
  trackData,
}: FormattedTrackObject) => (
  <button className={style["track-card"]}>
    <div>{name}</div>
    <div>{totalDistance}</div>
  </button>
);
