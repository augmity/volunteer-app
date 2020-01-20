export interface LatLong {
  lat: number;
  long: number;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  address?: string;
  position: LatLong;
  zoomLevel: number;
}
