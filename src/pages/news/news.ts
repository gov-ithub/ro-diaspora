import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { News } from '../../models/news';

import { NewsService } from '../../providers/news';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class PageNews {

  private news: News[];
  private subscribeNews: Subscription;

  constructor(
    public navCtrl: NavController,
    private newsService: NewsService
  ) { }

  ionViewWillEnter() {
    this.setNews();
  }

  ionViewWillLeave() {
    this.unsubscribe();
  }

  private setNews() {

    // get news
    this.subscribeNews = this.newsService.getNews()
      .subscribe(news => this.news = news);

  }

  private unsubscribe() {

    this.subscribeNews.unsubscribe();

  }

}
