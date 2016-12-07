import { Component } from '@angular/core';
import { Platform, NavController, ModalController } from 'ionic-angular';

import { PageMapView } from '../../pages/map-view/map-view';

import { MarkersService } from '../../providers/markers';
import { PositionService } from '../../providers/position';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

const latLngEurope: google.maps.LatLngLiteral = {lat: 49.1569609, lng: 13.898136};

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class PageMap {

  private map: google.maps.Map;
  private userMarker: google.maps.Marker;
  private position: google.maps.LatLngLiteral;
  private subscribeMarkers: Subscription;
  private subscribePosition: Subscription;

  constructor(
    private platform: Platform,
    private navController: NavController,
    private modalController: ModalController,
    private markersService: MarkersService,
    private positionService: PositionService
  ) { }

  ionViewWillEnter() {
    this.setMap();
  }

  ionViewDidEnter() {
    this.setMarkers();
    this.setUserMarker();
  }

  ionViewDidLeave() {
    this.unsubscribe();
  }

  locate() {

    this.map.panTo(this.position);
    this.map.setZoom(16);

  }

  private setMap() {

    // set map
    let mapOptions = {
      center: latLngEurope,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      maxZoom: 16,
      minZoom: 2,
      zoom: 4
    };
    this.map = new google.maps.Map(document.getElementById("gmap"), mapOptions);

    // set user marker
    this.userMarker = new google.maps.Marker({ map: this.map, position: null });

  }

  private setMarkers() {

    // get & set markers
    this.subscribeMarkers = this.markersService.getMarkers()
      .subscribe(marker => {

        let markers = marker.map(marker => {
          let options = {
            position: { 
              lat: Number(marker.coords.lat), 
              lng: Number(marker.coords.long),
            },
            map: this.map
          };
          let output = new google.maps.Marker(options)
          output.addListener('click', () => {
            if ( this.platform.is('mobile') ) this.navController.push(PageMapView, { id: marker.id });
            else this.modalController.create(PageMapView, { id: marker.id }).present();
          });
          return output;
        });

        new MarkerClusterer(this.map, markers,
          { imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m' }
        );

      });

  }

  private setUserMarker() {

    // get user location and update user marker
    this.subscribePosition = this.positionService.getPosition()
      .subscribe(position => {
        this.position = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.userMarker.setOptions({ position: this.position, visible: true })
      });

  }

  private unsubscribe() {

    // do not unsubscribe if ionViewDidLeave in a children page
    if ( this.navController.getActive(true).name == 'PageMapView' ) return;

    this.subscribePosition.unsubscribe();
    this.subscribeMarkers.unsubscribe();

  }

}
