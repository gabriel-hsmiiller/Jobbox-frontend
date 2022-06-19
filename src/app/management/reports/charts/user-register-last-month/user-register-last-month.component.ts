import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'jbx-user-register-last-month',
  templateUrl: './user-register-last-month.component.html',
  styleUrls: ['./user-register-last-month.component.scss']
})
export class UserRegisterLastMonthComponent {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: any[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartData: ChartData = {
    datasets: [
      { data: [10,20,30], label: 'Series A', backgroundColor: ['#5A71B0','#FFC32A','#FF4545'], hoverBackgroundColor: ['#5A71B0AA','#FFC32AAA','#FF4545AA'], hoverBorderColor: ['#5A71B0','#FFC32A','#FF4545'] },
      { data: [70,60,50], label: 'Series B', backgroundColor: ['#5A71B0','#FFC32A','#FF4545'], hoverBackgroundColor: ['#5A71B0AA','#FFC32AAA','#FF4545AA'], hoverBorderColor: ['#5A71B0','#FFC32A','#FF4545'] },
      { data: [20,40,60], label: 'Series C', backgroundColor: ['#5A71B0','#FFC32A','#FF4545'], hoverBackgroundColor: ['#5A71B0AA','#FFC32AAA','#FF4545AA'], hoverBorderColor: ['#5A71B0','#FFC32A','#FF4545'] },
      { data: [10,30,50], label: 'Series D', backgroundColor: ['#5A71B0','#FFC32A','#FF4545'], hoverBackgroundColor: ['#5A71B0AA','#FFC32AAA','#FF4545AA'], hoverBorderColor: ['#5A71B0','#FFC32A','#FF4545'] },
    ],
    labels: ['Download Sales', 'In-Store Sales', 'Mail Sales']
  };

  constructor() {}
}
