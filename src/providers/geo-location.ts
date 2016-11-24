import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';

@Injectable()
export class GeoLocationService {
  caca: any;

  constructor() { }

  getLocation() {
    return Geolocation.getCurrentPosition()
      .then(pos => { return pos.coords });
  }

  // watchLocation() {
  //   Geolocation.watchPosition()
  //     .subscribe(position => {
  //       let geoposition = (position as Geoposition);
  //       let positionError = (position as PositionError);
  //       if ((position as Geoposition).coords != undefined) {
  //         return [geoposition.coords.latitude, geoposition.coords.longitude];
  //       } else {
  //         console.log('Error ' + positionError.code + ': ' + positionError.message);
  //       }
  //     });
  // }

}
