import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MarkerVotingStation } from '../models/marker-voting-station';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MarkersService {

  private urlMarkers = 'http://www.mocky.io/v2/583c39b629000037076eca64';

  constructor(
    public http: Http
  ) { }

  getMarkers(id: number | boolean = false): Observable<MarkerVotingStation[]> {
    return this.http.get(this.urlMarkers)
      .map((res: Response) => {
        let output: MarkerVotingStation[] = res.json();
        if ( id ) output = output.filter(res => res.n == id);
        return output;
      });
  }

  }

}
