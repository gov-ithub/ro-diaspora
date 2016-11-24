import { Injectable } from '@angular/core';

import { Geolocation } from 'ionic-native';

@Injectable()
export class GeoLocationService {

  constructor() { }

  getLocation() {
    return Geolocation.getCurrentPosition()
      .then(pos => { return pos.coords });
  }

}
