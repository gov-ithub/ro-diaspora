import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { News } from '../../models/news';
import { NewsService } from '../../providers/news';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class PageNews {
  news: News[]

  constructor(
    public navCtrl: NavController,
    private newsService: NewsService
  ) {
    newsService.load().subscribe(news => {
      this.news = news;
    })
  }
}
