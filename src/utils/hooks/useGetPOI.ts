import { useEffect, useState } from "react";
import { MAPBOX_API_KEY } from "../../config";
import { PoiData, ReversedGeocodeResponse } from "../../types";
import { request } from "../request";

export const useGetPOI = (
  longitude: number | undefined,
  latitude: number | undefined
): PoiData[] => {
  const [pois, setPois] = useState<PoiData[]>([]);
  useEffect(() => {
    if (longitude == null || latitude == null) {
      return;
    }
    request<ReversedGeocodeResponse>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=10&types=poi&access_token=${MAPBOX_API_KEY}`
    ).then((placeRes) =>
      setPois(
        placeRes.features.map(({ text, center }) => ({
          name: text,
          center,
        })) as PoiData[]
      )
    );
  }, [latitude, longitude]);
  return pois;
};
