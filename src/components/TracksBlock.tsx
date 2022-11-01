import { useEffect, useState } from "react";
import demoTrack from "../data/demoTrack.json";
import { FormattedTrackObject } from "../types";
import { AddTrack } from "./AddTrack";
import { TrackCard } from "./TrackCard";
import styles from "./TracksBlock.module.scss";

export const TracksBlock = () => {
  const [userTracks, setUserTracks] = useState<FormattedTrackObject[]>([]);
  useEffect(() => {
    const getUserTracks = () => {
      const keys = Object.keys(localStorage);
      const tracksFromLocalStorage = keys
        .filter((key) => key.startsWith("track-"))
        .map((key) => JSON.parse(localStorage[key]));
      setUserTracks(tracksFromLocalStorage);
    };
    getUserTracks();
    window.addEventListener("storage", getUserTracks);
    return () => {
      window.removeEventListener("storage", getUserTracks);
    };
  }, []);
  return (
    <div className={styles["tracks-cards-block"]}>
      <TrackCard
        formattedTrackObj={demoTrack as FormattedTrackObject}
        className="track-card--demo"
      />
      {userTracks.map((formattedTrack) => (
        <TrackCard
          formattedTrackObj={formattedTrack as FormattedTrackObject}
          key={`${formattedTrack.name}-${formattedTrack.totalDistance}`}
        />
      ))}
      <AddTrack />
    </div>
  );
};
