import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Diagnostic, Dialogs, GoogleAnalytics } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { PageWelcome } from '../pages/welcome/welcome';
import { PageMap } from '../pages/map/map';
import { PageInfo } from '../pages/info/info';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(
    private platform: Platform,
    private storage: Storage
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Hartă', icon: 'map', component: PageMap },
      { title: 'Info Utile', icon: 'help-circle', component: PageInfo }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.keys().then((data) => {
        if ( data.indexOf('page-welcome-saw') == -1 ) this.rootPage = PageWelcome;
        else this.rootPage = PageMap;
      });

      StatusBar.styleDefault();

      setTimeout(() => {
        Splashscreen.hide();
      }, 250);

      Diagnostic.isLocationEnabled()
        .then((enabled) => {
          if ( !enabled ) {
            Dialogs.confirm(
              'Pentru a te putea localiza pe hartă, avem nevoie să pornești locația.', 'Pornești locația?', ['Da', 'Nu']
            ).then((button) => {
              if ( button == 1 ) Diagnostic.switchToLocationSettings();
            });
          }
        })
        .catch(error => error);

      GoogleAnalytics.startTrackerWithId("UA-88745908-1");
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
