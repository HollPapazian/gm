import { useEffect, useState } from "react";
import { MAPBOX_API_KEY } from "../../config";
import { ReversedGeocodeResponse } from "../../types";
import { request } from "../request";

export const useGetPlaceByCord = (
  longitude: number | undefined,
  latitude: number | undefined
): string => {
  const [place, setPlace] = useState<string>("");
  useEffect(() => {
    if (longitude == null || latitude == null) {
      return;
    }
    request<ReversedGeocodeResponse>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=10&types=place&access_token=${MAPBOX_API_KEY}`
    ).then((placeRes) => setPlace(placeRes.features[0].text));
  }, [latitude, longitude]);
  return place;
};
