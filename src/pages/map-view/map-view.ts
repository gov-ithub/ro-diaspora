import { Component } from '@angular/core';
import { ViewController, NavParams, Platform } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

import { PageFeedback } from '../feedback/feedback';
import { MarkersService } from '../../providers/markers';

declare var directions: any;

@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html'
})
export class PageMapView {
  FeedbackPage = PageFeedback;

  sliderOptions = {
    pager: true,
  };
  marker;
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
    this.platform.ready().then(() =>
      GoogleAnalytics.trackView("map-view-" + this.id).catch(error => error)
    );
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
        this.marker.get("coords").latitude,
        this.marker.get("coords").longitude,
      );
    } else {
      window.open(
        'http://maps.google.com/maps?daddr='
          + this.marker.get("coords").latitude + ','
          + this.marker.get("coords").longitude + '&saddr=My+Location',
        '_blank'
      );
    }
  }

  private setMarker() {
    this.markersService.getMarkerByID(this.id).then((marker) => {
      this.marker = marker;
      this.imagePanoramic =
        'https://maps.googleapis.com/maps/api/streetview?size=640x260&fov=120&location='
          + this.marker.get("coords").latitude + ','
          + this.marker.get("coords").longitude;

      this.image =
        'https://maps.googleapis.com/maps/api/staticmap?size=640x260&scale=1&zoom=17&markers=size:mid|color:red|'
        + this.marker.get("coords").latitude + ','
        + this.marker.get("coords").longitude;
    });
  }
}
