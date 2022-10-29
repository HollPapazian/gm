import demoTrack from "../data/demoTrack.json";
import { FormattedTrackObject } from "../types";
import { TrackCard } from "./TrackCard";

export const TracksBlock = () => {
  return (
    <div>
      <TrackCard {...demoTrack as FormattedTrackObject} />
    </div>
  );
};
