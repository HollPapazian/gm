export interface TrackLayerData {
  vendor: number;
  path: [number, number][];
  timestamps: number[];
}

export interface FormattedTrackObject {
  name: string;
  trackData: TrackLayerData;
  totalDistance: number;
  id: number;
}
