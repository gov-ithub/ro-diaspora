import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation, Geoposition } from 'ionic-native';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { MarkersService } from '../../providers/markers';

const latLngEurope: google.maps.LatLngLiteral = {lat: 49.1569609, lng: 13.898136};

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class PageMap {

  public latLng: google.maps.LatLngLiteral;
  public map: google.maps.Map;
  public marker: google.maps.Marker;
  public markers: google.maps.Marker[];
  public watchPosition: Subscription;

  constructor(
    public navCtrl: NavController,
    public markersService: MarkersService
  ) { }

  locate() {
    this.map.panTo(this.latLng);
    this.map.setZoom(16);
  }

  ionViewWillEnter() {

    // map
    let mapOptions = {
      center: latLngEurope,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      maxZoom: 16,
      minZoom: 2,
      zoom: 4
    };
    this.map = new google.maps.Map(document.getElementById("gmap"), mapOptions);

    // user marker
    let markerOptions = {
      position: null,
      map: this.map
    };
    this.marker = new google.maps.Marker(markerOptions);

    // get user location and update his marker position
    let options = {
      enableHighAccuracy: true,
      maximumAge: 5000
    };
    this.watchPosition = Geolocation.watchPosition(options)
      .filter((p: any) => p.code === undefined)
      .subscribe((position: Geoposition) => {
        this.latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.marker.setPosition(this.latLng);
      });

    // get & set markers
    this.markersService.getData()
      .then(data => {

        this.markers = data.map(marker => {
          let options = {
            position: { lat: Math.floor(marker.la), lng: Math.floor(marker.lo) },
            map: this.map
          };
          return new google.maps.Marker(options);
        });

        new MarkerClusterer(this.map, this.markers,
          {imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'}
        );

      });

  }

  ionViewWillLeave() {
    this.watchPosition.unsubscribe();
  }

}
