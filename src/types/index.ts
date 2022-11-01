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

export interface ReversedGeocodeResponse {
  type: string;
  query: number[];
  features: Feature[];
  attribution: string;
}

interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}

interface Context {
  id: string;
  wikidata: string;
  text: string;
  short_code?: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  wikidata: string;
}

export interface PoiData {
  name: string;
  center: [number, number];
}
