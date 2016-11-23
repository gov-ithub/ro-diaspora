import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})
export class PageHomepage {

  lat: number = 44.439199;
  lng: number = 26.0960345;

  constructor(public navCtrl: NavController) { }

}
