import { useEffect, useState } from "react";
import demoTrack from "../data/demoTrack.json";
import { FormattedTrackObject, TrackLayerData } from "../types";
import { AddTrack } from "./AddTrack";
import { TrackCard } from "./TrackCard";
import styles from "./TracksBlock.module.scss";

export const TracksBlock = ({
  setTrack,
}: {
  setTrack: React.Dispatch<React.SetStateAction<TrackLayerData | null>>;
}) => {
  const [userTracks, setUserTracks] = useState<FormattedTrackObject[]>([]);
  useEffect(() => {
    const keys = Object.keys(localStorage);
    const tracksFromLocalStorage = keys
      .filter((key) => key.startsWith("track-"))
      .map((key) => JSON.parse(localStorage[key]));
    setUserTracks(tracksFromLocalStorage);
  }, []);
  return (
    <div className={styles["tracks-cards-block"]}>
      <TrackCard {...(demoTrack as FormattedTrackObject)} setTrack={setTrack} />
      {userTracks.map((formattedTrack) => (
        <TrackCard
          {...(formattedTrack as FormattedTrackObject)}
          setTrack={setTrack}
          key={`${formattedTrack.name}-${formattedTrack.totalDistance}`}
        />
      ))}
      <AddTrack />
    </div>
  );
};
