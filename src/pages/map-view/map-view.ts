import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { PageFAQ } from '../faq/faq';
import { PageFeedback } from '../feedback/feedback';

import { MarkerVotingStation } from '../../models/marker-voting-station';
import { MarkersService } from '../../providers/markers';

@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html'
})

export class PageMapView {
  FAQPage = PageFAQ;
  FeedbackPage = PageFeedback;

  sliderOptions = {
    pager: true,
  };
  marker: MarkerVotingStation;
  image: string;
  imagePanoramic: string;
  isOverlay: boolean;

  private id?: string = null;

  constructor(
    private viewController: ViewController,
    private navParams: NavParams,
    private markersService: MarkersService
  ) {
    this.id = navParams.get('id');
    this.isOverlay = this.viewController.isOverlay;
  }

  ionViewDidLoad() {
    this.setMarker();
  }

  close() {
    this.viewController.dismiss();
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
