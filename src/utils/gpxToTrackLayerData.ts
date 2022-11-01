import gpxParser from "gpxparser";
import { FormattedTrackObject, TrackLayerData } from "../types";

export const gpxToTrackLayerData = (gpxStr: string): FormattedTrackObject => {
  var gpx = new gpxParser();
  gpx.parse(gpxStr);
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
  return {
    trackData: formattedTrackData,
    totalDistance: gpx.tracks[0].distance.total,
    name: gpx.tracks[0].name,
    id: Math.random(),
  };

  // return [formattedTrackData];
};
