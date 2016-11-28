import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation, Geoposition } from 'ionic-native';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

interface ICoords {lat: number, lng: number}
const latLngEurope: ICoords = {lat: 49.1569609, lng: 13.898136};

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class PageMap {

  public latLng: ICoords;
  public map: google.maps.Map;
  public marker: google.maps.Marker;
  public markers: google.maps.Marker;
  public watch: Subscription;

  constructor(
    public navCtrl: NavController
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
    this.watch = Geolocation.watchPosition(options)
      .filter((p: any) => p.code === undefined)
      .subscribe((position: Geoposition) => {
        this.latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.marker.setPosition(this.latLng);
      });

  }

  ionViewWillLeave() {
    this.watch.unsubscribe();
  }

}
