import { Injectable } from '@angular/core';

import { Geolocation, Geoposition } from 'ionic-native';

import 'rxjs/add/operator/filter';

@Injectable()
export class PositionService {

  constructor() { }

  getPosition() {
    let options = {
      enableHighAccuracy: true,
      maximumAge: 5000
    };
    return <Geoposition | any>Geolocation.watchPosition(options)
      .filter((res: any) => res.code === undefined);
  }

}
