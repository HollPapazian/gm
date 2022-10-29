interface A {
  latitude?: number;
  longitude?: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export const getInitMapState = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): A => ({
  latitude,
  longitude,
  zoom: 11,
  bearing: 0,
  pitch: 20,
});
