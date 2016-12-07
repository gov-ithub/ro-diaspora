import { VotingStationCoordinates } from './voting-station-coordinates';
import { VotingStationCategory } from './voting-station-category';

export interface MarkerVotingStation {
  id: string; 
  name: string; 
  address: string; 
  country: string; 
  coords: VotingStationCoordinates; 
  category: VotingStationCategory;
}
