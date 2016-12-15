import { Injectable } from '@angular/core';

import { MarkerVotingStation } from '../models/marker-voting-station';
import { VotingStationsData } from './markers-data';

@Injectable()
export class MarkersService {
  getMarkers(id?: string): MarkerVotingStation[] {
    let output: MarkerVotingStation[] = VotingStationsData;
    if (id) {
      output = output.filter(res => res.id === id);
    }
    return output;
  }
}
