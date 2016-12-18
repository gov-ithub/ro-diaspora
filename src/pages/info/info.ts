import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class PageInfo {

  constructor(
    private navController: NavController,
    private platform: Platform
  ) {
    this.platform.ready().then(() => GoogleAnalytics.trackView("info").catch(error => error));
  }

}
