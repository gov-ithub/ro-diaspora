import { Injectable } from '@angular/core';

import { Parse } from 'parse';
import { Config } from '../app/config/config';

import { ErrorUtils } from '../error/errorutils';

@Injectable()
export class MarkersService {
  private markerObject;
  private query;

  constructor() {
    this.markerObject = Parse.Object.extend("MarkerObject");
    this.query = new Parse.Query(this.markerObject);

    Parse.initialize(Config.APP_ID);
    Parse.serverURL = Config.SERVER_URL;
  }

  getMarkerByID(id: string) {
    return this.query.get(id).then(function(marker) {
      return marker;
    }, function(error) {
      Parse.Analytics.track('error', {
        code: error.code,
        stack: ErrorUtils.getStackTrace()
      });
    });
  }

  getMarkers() {
    return this.query.find().then(function(markers) {
      return markers;
    }, function(error) {
      Parse.Analytics.track('error', {
        code: error.code,
        stack: ErrorUtils.getStackTrace()
      });
    });
  }

  getMarkersByCategoryID(category: string) {
    this.query.equalTo('category', category);
    return this.query.find().then(function(markers) {
      return markers;
    }, function(error) {
      Parse.Analytics.track('error', {
        code: error.code,
        stack: ErrorUtils.getStackTrace()
      });
    });
  }

  getMarkerCategories() {
    let categories = [];
    return this.getMarkers().then(function(markers) {
      markers.map((item, index) => {
        if (categories.indexOf(item.get("category")) == -1) {
          categories.push(item.get("category"));
        }
      });

      return categories.filter(n => n);
    }, function(error) {
      Parse.Analytics.track('error', {
        code:error.code,
        stack: ErrorUtils.getStackTrace()
      });
    });
  }
}
