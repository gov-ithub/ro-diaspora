import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { News } from '../models/news';

@Injectable()
export class NewsService {

  url = 'http://www.mocky.io/v2/583604b61100005b110c0065';

  constructor(public http: Http) {}

  load(): Observable<News[]> {
    return this.http.get(this.url)
      .map(res => <News[]>res.json());
  }

}
