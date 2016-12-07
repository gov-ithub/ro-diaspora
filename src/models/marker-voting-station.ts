import { VotingStationCoordinates } from './voting-station-coordinates';
import { VotingStationCategory } from './voting-station-category';

export interface MarkerVotingStation {
  id: number; 
  name: string; 
  address: string; 
  country: string; 
  coords: VotingStationCoordinates; 
  category: VotingStationCategory;
}
