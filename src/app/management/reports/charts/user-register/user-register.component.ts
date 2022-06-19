import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData, Color } from 'chart.js';

@Component({
  selector: 'jbx-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData = {
    datasets: [
      { data: [4,2,5,3,5,6,7], label: 'Colaboradores', backgroundColor: '#5A71B0', hoverBackgroundColor: '#5A71B0AA', hoverBorderColor: '#5A71B0' },
      { data: [7,2,4,5,3,2,5], label: 'Clientes', backgroundColor: '#FFC32A', hoverBackgroundColor: '#FFC32AAA', hoverBorderColor: '#FFC32A' },
      { data: [2,4,1,7,5,3,6], label: 'Administradores', backgroundColor: '#FF4545', hoverBackgroundColor: '#FF4545AA', hoverBorderColor: '#FF4545' },
    ],
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  };

  constructor() {}
}
