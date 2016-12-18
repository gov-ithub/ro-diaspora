import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from 'ionic-native';

import { PageMap } from '../map/map';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class PageWelcome {

  constructor(
    private platform: Platform,
    private navController: NavController,
    private storage: Storage
  ) {
    this.platform.ready().then(() => GoogleAnalytics.trackView("welcome").catch(error => error));
  }

  close() {
    this.navController.setRoot(PageMap).then(
      () => this.storage.set('page-welcome-saw', true)
    );
  }

}
