import demoTrack from "./data/demoTrack.json";
import { MapWithTracks } from "./components/MapWithTracks";
import { TrackLayerData } from "./types";

function App() {
  return <MapWithTracks data={demoTrack as TrackLayerData[]} />;
}

export default App;
