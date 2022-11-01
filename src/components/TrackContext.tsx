import { createContext, ReactNode, useState } from "react";
import { FormattedTrackObject } from "../types";

const TrackContext = createContext<{
  track: FormattedTrackObject | null;
  setTrack: React.Dispatch<React.SetStateAction<FormattedTrackObject | null>>;
}>({ track: null, setTrack: () => {} });

function TrackProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<FormattedTrackObject | null>(null);
  const value = { track, setTrack };
  return (
    <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
  );
}

export { TrackProvider, TrackContext };
