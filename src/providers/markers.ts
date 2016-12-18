import { Injectable } from '@angular/core';

import { MarkerVotingStation } from '../models/marker-voting-station';
import { VotingStationsData } from './markers-data';

import { MarkerCategoryID } from '../models/marker-category-id';
import { VotingStationCategory } from '../models/voting-station-category';

@Injectable()
export class MarkersService {
  getMarkers(id?: string): MarkerVotingStation[] {
    let output: MarkerVotingStation[] = VotingStationsData.filter(
      res => res.category.id !== MarkerCategoryID.SectiiVot
    );

    if (id) {
      output = output.filter(res => res.id === id);
    }
    return this.renameMarkers(output);
  }

  getMarkersByCategoryID(categoryID: MarkerCategoryID): MarkerVotingStation[] {
    return this.renameMarkers(
      VotingStationsData.filter(res => res.category.id === categoryID)
    );
  }

  getMarkerCategories(): VotingStationCategory[] {
    let categories = [];
    VotingStationsData.map((item, index) => {
      if (categories.indexOf(item.category.id) == -1) {
        categories[item.category.id] = item.category;
      }
    });

    return categories.filter(n => n);
  }

  private renameMarkers(markers: MarkerVotingStation[]): MarkerVotingStation[] {
    return markers.map((item, index) => {
      item.name = item.address;
      return item;
    });
  }
}
