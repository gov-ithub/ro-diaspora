import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { News } from '../models/news';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  url = 'http://www.mocky.io/v2/583604b61100005b110c0065';

  constructor(
    public http: Http
  ) { }

  getNews(): Observable<News[]> {
    return this.http.get(this.url)
      .map((res: Response) => res.json() as News[]);
  }

}
