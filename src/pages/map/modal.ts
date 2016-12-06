import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { MarkerVotingStation } from '../../models/marker-voting-station';
import { MarkerStats } from '../../models/markers-stats';

import { MarkersService } from '../../providers/markers';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import Chart from 'chart.js/dist/Chart.bundle.js';

@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalMap {

  public marker: MarkerVotingStation;
  public image: string;

  private id: number = 0;
  private chart: Chart;
  private subscribeMarker: Subscription
  private subscribeMarkerStats: Subscription;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private markersService: MarkersService
  ) {
    this.id = navParams.get('id');
  }

  ionViewWillEnter() {
    this.setMarker();
    this.setChart();
  }

  ionViewWillLeave() {
    this.unsubscribe();
  }

  close() {

    this.viewController.dismiss();

  }

  private setMarker() {

    this.subscribeMarker = this.markersService.getMarkers(this.id)
      .subscribe((marker: MarkerVotingStation[]) => {
        this.marker = marker[0];
        this.image = 'https://maps.googleapis.com/maps/api/staticmap?size=640x260&scale=1&zoom=17&markers=size:mid|color:red|' + marker[0].la + ','+ marker[0].lo;
      });

  }

  private setChart() {

    // set chart & chart data
    this.subscribeMarkerStats = this.markersService.getStats(this.id)
      .subscribe((markerStats: MarkerStats[]) => {

        let labels = markerStats.map(data => data.timestamp),
            data = markerStats.map(data => data.stats);

        if ( labels.length && data.length ) {
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
