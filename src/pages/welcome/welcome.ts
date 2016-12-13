import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PageMap } from '../map/map';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class PageWelcome {

  constructor(
    public navController: NavController,
    private storage: Storage
  ) { }

  close() {
    this.navController.setRoot(PageMap).then(
      () => this.storage.set('page-welcome-saw', true)
    );
  }

}
