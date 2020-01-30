import { Place } from '../../libs/maps';

export interface Location extends Place {
  id: string;
  name: string;
  description?: string;
  zoomLevel: number;
}
