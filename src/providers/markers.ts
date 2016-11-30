import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MarkerVotingStation } from '../models/marker-voting-station';

@Injectable()
export class MarkersService {

  url = 'http://www.mocky.io/v2/583c39b629000037076eca64';

  constructor(
    public http: Http
  ) { }

  getData(): Promise<MarkerVotingStation[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(res => <MarkerVotingStation[]>res.json())
  }

}
