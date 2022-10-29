import { getCenter } from "geolib";
import { useMemo } from "react";

export const useGetCenter = (path: [number, number][]) => {
  const center = useMemo(() => {
    const formattedPath = path.map(([longitude, latitude]) => ({
      longitude,
      latitude,
    }));
    return getCenter(formattedPath);
  }, [path]);
  return center;
};
