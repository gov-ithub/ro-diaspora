import { Component } from '@angular/core';
import { ViewController, NavParams, Slides } from 'ionic-angular';

import { MarkerVotingStation } from '../../models/marker-voting-station';
import { MarkerStats } from '../../models/markers-stats';

import { MarkersService } from '../../providers/markers';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import Chart from 'chart.js/dist/Chart.bundle.js';

@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html'
})
export class PageMapView {

  sliderOptions = {
    pager: true,
  };
  marker: MarkerVotingStation;
  image: string;
  imagePanoramic: string;
  isOverlay: boolean;

  private id: number = 0;
  private chart: Chart;
  private subscribeMarker: Subscription
  private subscribeMarkerStats: Subscription;

  constructor(
    private viewController: ViewController,
    private navParams: NavParams,
    private markersService: MarkersService
  ) {
    this.id = navParams.get('id');
    this.isOverlay = this.viewController.isOverlay;
  }

  ionViewDidLoad() {
    this.setMarker();
    this.setChart();
  }

  ionViewDidLeave() {
    this.unsubscribe();
  }

  close() {

    this.viewController.dismiss();

  }

  private setMarker() {

    this.subscribeMarker = this.markersService.getMarkers(this.id)
      .subscribe((marker: MarkerVotingStation[]) => {
        this.marker = marker[0];
        this.imagePanoramic = 
          'https://maps.googleapis.com/maps/api/streetview?size=640x260&fov=120&location='
            + marker[0].coords.lat + ',' + marker[0].coords.long;
        this.image = 
          'https://maps.googleapis.com/maps/api/staticmap?size=640x260&scale=1&zoom=17&markers=size:mid|color:red|' 
          + marker[0].coords.lat + ','+ marker[0].coords.long;
      });

  }

  private setChart() {

    // set chart & chart data
    this.subscribeMarkerStats = this.markersService.getStats(this.id)
      .subscribe((markerStats: MarkerStats[]) => {

        let labels = markerStats.map(data => data.timestamp),
          data = markerStats.map(data => data.stats);

        if (labels.length && data.length) {
          let chartOptions = {
            type: 'line',
            options: {
              animation: false,
              legend: { display: false },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    tooltipFormat: 'HH:mm',
                    unit: 'hour',
                    unitStepSize: 1,
                    displayFormats: {
                      minute: 'HH:mm',
                      hour: 'HH:mm'
                    },
                  }
                }]
              }
            },
            data: {
              labels: labels,
              datasets: [{
                data: data
              }]
            }
          };
          this.chart = new Chart(document.getElementById("chart"), chartOptions);
          this.chart.update();
        }

      });

  }

  private unsubscribe() {

    this.subscribeMarkerStats.unsubscribe();
    this.subscribeMarker.unsubscribe();

  }

}
