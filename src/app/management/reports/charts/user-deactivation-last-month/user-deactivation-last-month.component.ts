import { Component } from '@angular/core';
import { ChartData, ChartOptions, Color, ChartType } from 'chart.js';

@Component({
  selector: 'jbx-user-deactivation-last-month',
  templateUrl: './user-deactivation-last-month.component.html',
  styleUrls: ['./user-deactivation-last-month.component.scss']
})
export class UserDeactivationLastMonthComponent {
  public lineChartData: ChartData = {
    datasets: [
      { data: [4,2,5,3,5,6,7], label: 'Colaboradores', borderColor: '#5A71B0', backgroundColor: '#5A71B0', pointBackgroundColor: '#5A71B0', pointBorderColor: '#5A71B0', pointHoverBorderColor: '#5A71B0', hoverBackgroundColor: '#5A71B0AA', hoverBorderColor: '#5A71B0' },
      { data: [7,2,4,5,3,2,5], label: 'Clientes', borderColor: '#FFC32A', backgroundColor: '#FFC32A', pointBackgroundColor: '#FFC32A', pointBorderColor: '#FFC32A', pointHoverBorderColor: '#FFC32A', hoverBackgroundColor: '#FFC32AAA', hoverBorderColor: '#FFC32A' },
      { data: [2,4,1,7,5,3,6], label: 'Administradores', borderColor: '#FF4545', backgroundColor: '#FF4545', pointBackgroundColor: '#FF4545', pointBorderColor: '#FF4545', pointHoverBorderColor: '#FF4545', hoverBackgroundColor: '#FF4545AA', hoverBorderColor: '#FF4545' },
    ],
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  };
  public lineChartLabels: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = ['',''];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }
}
