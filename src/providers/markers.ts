import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MarkerVotingStation } from '../models/marker-voting-station';
import { MarkerStats } from '../models/markers-stats';
import { VotingStationsData } from './markers-data';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MarkersService {
  private urlStats = 'http://www.mocky.io/v2/5841ce7e1000009611bb4cea';

  constructor(
    private http: Http
  ) { }

  getMarkers(id?: string): MarkerVotingStation[] {
    let output: MarkerVotingStation[] = VotingStationsData;
    if (id) {
      output = output.filter(res => res.id === id);
    }
    return output;
  }

  getStats(id: number | boolean = false): Observable<MarkerStats[]> {
    return this.http.get(this.urlStats)
      .map((res: Response) => {
        let output: MarkerStats[] = res.json();
        output = output.sort((a, b) => a.timestamp - b.timestamp);
        if ( id ) output = output.filter(res => res.locationid == id);
        return output;
      });
  }

}
