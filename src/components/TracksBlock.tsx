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
    const getUserTracks = () => {
      console.log("getUserTracks!!!");
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
      <TrackCard {...(demoTrack as FormattedTrackObject)} setTrack={setTrack} className="track-card--demo"/>
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
