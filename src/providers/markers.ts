import { Injectable } from '@angular/core';

import { Marker } from '../models/marker';
import { MarkerCategoryID } from '../models/marker-category-id';
import { MarkerCategory } from '../models/marker-category';

import { MarkersData } from './markers-data';

@Injectable()
export class MarkersService {
  getMarkers(id?: string): Marker[] {
    let output: Marker[] = MarkersData.filter(
      res => res.category.id !== MarkerCategoryID.SectiiVot
    );

    if (id) {
      output = output.filter(res => res.id === id);
    }
    return this.renameMarkers(output);
  }

  getMarkersByCategoryID(categoryID: MarkerCategoryID): Marker[] {
    return this.renameMarkers(
      MarkersData.filter(res => res.category.id === categoryID)
    );
  }

  getMarkerCategories(): MarkerCategory[] {
    let categories = [];
    MarkersData.map((item, index) => {
      if (categories.indexOf(item.category.id) == -1) {
        categories[item.category.id] = item.category;
      }
    });

    return categories.filter(n => n);
  }

  private renameMarkers(markers: Marker[]): Marker[] {
    return markers.map((item, index) => {
      item.name = item.address;
      return item;
    });
  }
}
