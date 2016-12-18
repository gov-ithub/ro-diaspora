import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  Platform,
  NavController,
  ModalController,
  ToastController,
  FabContainer,
} from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

import { Storage } from '@ionic/storage';

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
  @ViewChild("gmap") mapElement: ElementRef;

  userPosition: google.maps.LatLngLiteral = latLngEurope;
  markerCategories: string[];

  private map: google.maps.Map;
  private userMarker: google.maps.Marker;
  private locationMarkers: google.maps.Marker[] = [];
  private markers;
  private markersRef: google.maps.Marker[] = [];
  private clusterer?: MarkerClusterer = null;
  private hasLocation: boolean = false;
  private searchBox: google.maps.places.SearchBox;
  private searchEl: HTMLElement;
  private searchInput: HTMLInputElement;

  private markerIconUser: google.maps.Icon = {
    url: 'assets/icon/marker-user.png',
    size: new google.maps.Size(80, 80),
    anchor: new google.maps.Point(0, 30),
    scaledSize: new google.maps.Size(30, 30)
  };

  private markerIconVotingStation: google.maps.Icon = {
    url: 'assets/icon/marker-voting-station.png',
    size: new google.maps.Size(80, 101),
    anchor: new google.maps.Point(0, 38),
    scaledSize: new google.maps.Size(30, 38)
  };

  private markerIconLocation: google.maps.Icon = {
    url: 'assets/icon/marker-location.png',
    size: new google.maps.Size(82, 103),
    anchor: new google.maps.Point(0, 41),
    scaledSize: new google.maps.Size(30, 38)
  };

  private subscribePosition: Subscription;

  constructor(
    private platform: Platform,
    private navController: NavController,
    private modalController: ModalController,
    private markersService: MarkersService,
    private positionService: PositionService,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.platform.ready().then(
      () => GoogleAnalytics.trackView("map").catch(error => error)
    );
  }

  ionViewWillEnter() {
    this.searchEl = document.getElementById("search");
    this.searchInput = this.searchEl.getElementsByTagName('input')[0];

    this.setMap();
    this.presentToast();
    this.markersService.getMarkerCategories().then(
      (categories) => {
        this.markerCategories = categories;
      }
    );
  }

  ionViewDidEnter() {
    // WHY THIS EMPTY YO
    this.markersService.getMarkers().then(
      (markers) => this.setMarkers(markers)
    );
    this.setUserMarker();
    this.setSearch();
  }

  ionViewDidLeave() {
    this.unsubscribe();
  }

  locate(position: any = this.userPosition) {
    this.setMapCenter(position);
    this.resetLocationMarkers();
    this.searchInput.value = '';
  }

  resetSearch() {
    this.locate();
    this.searchInput.value = '';
    this.resetLocationMarkers();
  }

  switchView(cat, fab: FabContainer) {
    this.markersService.getMarkersByCategoryID(cat).then(
      (markers) => this.setMarkers(markers)
    );
    fab.close();
  }

  private resetLocationMarkers() {
    if (this.locationMarkers.length) {
      this.locationMarkers.forEach(marker => marker.setMap(null));
      this.locationMarkers = [];
    }
  }

  private presentToast() {
    this.storage.keys().then((data) => {
      if (data.indexOf('pages-toast-dismissed') == -1) {
        let toast = this.toastController.create({
          message: 'Apasă un punct de pe hartă pentru detalii',
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'Închide',
          dismissOnPageChange: true,
          cssClass: 'toast-gmaps',
        });

        toast.onDidDismiss(() => {
          this.storage.set('pages-toast-dismissed', true);
        });

        toast.present();
      }
    });
  }

  private setMap() {
    let mapOptions = {
      center: latLngEurope,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      maxZoom: 16,
      minZoom: 2,
      zoom: 4
    };

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapOptions
    );

    this.userMarker = new google.maps.Marker({
      map: this.map,
      position: null,
      icon: this.markerIconUser
    });
  }

  private setMarkers(markerList) {
    // if previously set markers, clear them
    if (this.markers) {
      console.log('this markers');
      this.markersRef.map(marker => marker.setMap(null));
    }
    this.markers = markerList;
    console.log('new this markers');

    let markers = this.markers.map(marker => {
      console.log('new this markers mapping');
      let options = {
        map: this.map,
        position: {
          lat: Number(marker.get("coords").latitude),
          lng: Number(marker.get("coords").longitude),
        },
        icon: this.markerIconVotingStation
      };
      let output = new google.maps.Marker(options)
      this.markersRef.push(output);
      output.addListener('click', () => {
        if ( this.platform.is('mobile') ) this.navController.push(PageMapView, { id: marker.get("id") });
        else this.modalController.create(PageMapView, { id: marker.id }).present();
      });
      return output;
    });
    console.log('done mapping');

    if (this.clusterer) {
      this.clusterer.clearMarkers();
    }

    if (markers.length > 100) {
      this.clusterer = new MarkerClusterer(this.map, markers,
        { imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m' }
      );
    }

    if (this.hasLocation) {
      this.locate();
    }
  }

  private setUserMarker() {
    this.subscribePosition = this.positionService.getPosition()
      .subscribe(position => {
        this.hasLocation = true;
        this.userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.userMarker.setOptions({ position: this.userPosition, visible: true });
        this.setMapCenter(this.userPosition);
      });
  }

  private setMapCenter(
    latLng: google.maps.LatLngLiteral,
  ) {

    this.map.setCenter(latLng);
    this.findClosestNMarkers(3, latLng).then(function(closeMarkers) {
      let bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(latLng.lat, latLng.lng));

      closeMarkers.map(
        (function(item, index) {
          this.markersService.getMarkerByID(item.id).then(
            (marker) => {
              bounds.extend(new google.maps.LatLng(
                marker.get("coords").latitude,
                marker.get("coords").longitude,
              ));
            }
          );
        }).bind(this)
      );

      this.map.fitBounds(bounds);
    });
  }

  private findClosestNMarkers(
    n: number,
    coords: google.maps.LatLngLiteral,
  ) {
    const R = 6371; // Earth radius
    let distances = [];
    return this.markersService.getMarkers().then((markers) => {
      const markerCount = markers.length;

      function toRad(n: number) {
        return n * Math.PI / 180;
      }

      for (let i = 0; i < markerCount; i++) {
        let mlat = Number(markers[i].get("coords").latitude);
        let mlng = Number(markers[i].get("coords").longitude);
        let dLat = toRad(mlat - coords.lat);
        let dLng = toRad(mlng - coords.lng);

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRad(coords.lat)) * Math.cos(toRad(coords.lat)) *
          Math.sin(dLng/2) * Math.sin(dLng/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = {
          "distance": d,
          "id": markers[i].get("id"),
        };
      }

      let sortedArr = distances.sort(function(a, b) {
        return a.distance - b.distance;
      });

      return sortedArr.slice(0, n);
    });
  }

  private setSearch() {
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchEl);
    this.searchBox = new google.maps.places.SearchBox(this.searchInput);

    this.searchBox.addListener('places_changed', () => {
      let places = this.searchBox.getPlaces();
      this.resetLocationMarkers();

      if (places.length == 0) return;

      // for each place, get the icon, name and location
      let bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        if (!place.geometry) return;

        // create a marker for each place
        this.locationMarkers.push(new google.maps.Marker({
          map: this.map,
          position: place.geometry.location,
          icon: this.markerIconLocation,
          title: place.name
        }));

        if (place.geometry.viewport) bounds.union(place.geometry.viewport);
        else bounds.extend(place.geometry.location);
      });
      this.map.fitBounds(bounds);
    });
  }

  private unsubscribe() {
    // do not unsubscribe if ionViewDidLeave in a children page
    if ( this.navController.getActive(true).name == 'PageMapView' ) {
      return;
    }

    this.subscribePosition.unsubscribe();
  }
}
