import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

import { News } from '../../models/news';

import { NewsService } from '../../providers/news';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class PageNews {

  news: News[];

  private subscribeNews: Subscription;

  constructor(
    private platform: Platform,
    private navController: NavController,
    private newsService: NewsService
  ) {
    this.platform.ready().then(() => GoogleAnalytics.trackView("news"));
  }

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
