import { MarkerCoordinates } from './marker-coordinates';
import { MarkerCategory } from './marker-category';

export interface Marker {
  id: string;
  name: string;
  address: string;
  country: string;
  coords: MarkerCoordinates;
  category: MarkerCategory;
}
