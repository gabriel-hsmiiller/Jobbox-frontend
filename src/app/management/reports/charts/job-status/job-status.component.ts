import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import {  } from 'ng2-charts';

@Component({
  selector: 'jbx-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.scss']
})
export class JobStatusComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any[] = ['01-07','08-14','15-21','22-28'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData = {
    datasets: [
      { data: [25,22,23,27], label: 'CREATED', backgroundColor: '#5A71B0', hoverBackgroundColor: '#5A71B0AA', hoverBorderColor: '#5A71B0' },
      { data: [8,4,12,6], label: 'CLOSED', backgroundColor: '#FFC32A', hoverBackgroundColor: '#FFC32AAA', hoverBorderColor: '#FFC32A' },
      { data: [15,18,17,13], label: 'DONE', backgroundColor: '#FF4545', hoverBackgroundColor: '#FF4545AA', hoverBorderColor: '#FF4545' },
    ],
    labels: ['01-07','08-14','15-21','22-28']
  };

  constructor() {}
}
