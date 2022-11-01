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
  zoom = 10,
}: {
  latitude: number;
  longitude: number;
  zoom?: number;
}): A => ({
  latitude,
  longitude,
  zoom,
  bearing: 0,
  pitch: 20,
});
