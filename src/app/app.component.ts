import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Diagnostic, Dialogs } from 'ionic-native';

import { PageMap } from '../pages/map/map';
import { PageFeedback } from '../pages/feedback/feedback';
import { PageInfo } from '../pages/info/info';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PageMap;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'Hartă', icon: 'map', component: PageMap },
      { title: 'Opinia ta', icon: 'checkbox', component: PageFeedback },
      { title: 'Info Utile', icon: 'help-circle', component: PageInfo }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
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
        });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
