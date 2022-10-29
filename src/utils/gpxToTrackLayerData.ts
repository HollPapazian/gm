import gpxParser from "gpxparser";
import { demoGpx } from "../data/demoGpx";
import { TrackLayerData } from "../types";

export const gpxToTrackLayerData = (): TrackLayerData[] => {
  var gpx = new gpxParser(); //Create gpxParser Object
  gpx.parse(demoGpx); //parse gpx file from string data
  // var totalDistance = gpx.tracks[0].distance.total;
  // gpx.tracks[0]
  console.log("gpx.tracks[0]: ", gpx.tracks[0]);
  // console.log("totalDistance: ", totalDistance);
  const formattedTrackData = gpx.tracks[0].points.reduce<TrackLayerData>(
    (trackData, cur: any) => {
      trackData.path.push([cur.lon, cur.lat]);
      trackData.timestamps.push(new Date(cur.time).getTime() / 1000);
      return trackData;
    },
    {
      vendor: 0,
      path: [],
      timestamps: [],
    }
  );

  return [formattedTrackData];
};

