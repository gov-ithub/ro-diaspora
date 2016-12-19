import { Component } from '@angular/core';
import { ViewController, NavParams, Platform } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

import { MarkersService } from '../../providers/markers';

import { Marker } from '../../models/marker';

declare var directions: any;

@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html'
})
export class PageMapView {
  sliderOptions = {
    pager: true,
  };
  marker: Marker;
  image: string;
  imagePanoramic: string;
  isOverlay: boolean;

  private id?: string = null;

  constructor(
    private viewController: ViewController,
    private navParams: NavParams,
    private markersService: MarkersService,
    private platform: Platform,
  ) {
    this.id = navParams.get('id');
    this.platform.ready().then(() => GoogleAnalytics.trackView("map-view-" + this.id).catch(error => error));
    this.isOverlay = this.viewController.isOverlay;
  }

  ionViewDidLoad() {
    this.setMarker();
  }

  close() {
    this.viewController.dismiss();
  }

  navigate() {
    if (this.platform.is('cordova')) {
      directions.navigateTo(
        this.marker.coords.lat,
        this.marker.coords.lng,
      );
    } else {
      window.open(
        'http://maps.google.com/maps?daddr='
          + this.marker.coords.lat + ',' + this.marker.coords.lng + '&saddr=My+Location',
        '_blank'
      );
    }
  }

  private setMarker() {
    this.marker = this.markersService.getMarkers(this.id)[0];
    this.imagePanoramic =
      'https://maps.googleapis.com/maps/api/streetview?size=640x260&fov=120&location='
        + this.marker.coords.lat + ',' + this.marker.coords.lng;
    this.image =
      'https://maps.googleapis.com/maps/api/staticmap?size=640x260&scale=1&zoom=17&markers=size:mid|color:red|'
      + this.marker.coords.lat + ','+ this.marker.coords.lng;
  }

}
