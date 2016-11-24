import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GeoLocationService } from '../../providers/geo-location';

@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})
export class PageHomepage {

  lat: number;
  lng: number;

  constructor(
    public navCtrl: NavController,
    public geoLocationService: GeoLocationService
  ) {
    geoLocationService.getLocation()
      .then((resp) => {
        this.lat = resp.latitude;
        this.lng = resp.longitude;
      });
  }

}
