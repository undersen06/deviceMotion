import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-hardware-chart',
  templateUrl: './hardware-chart.component.html',
  styleUrls: ['./hardware-chart.component.scss'],
})
export class HardwareChartComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'axis X' },
    { data: [], label: 'axis y' },
    { data: [], label: 'axis Z' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions: any = {
    responsive: true,
    bezierCurve: false

  };

  lineChartColors: Color[] = [];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor() { }

  ngOnInit() {}

  addData(acceleration:any) {
    this.lineChartData[0].data.push(acceleration.x);
    this.lineChartData[1].data.push(acceleration.y);
    this.lineChartData[2].data.push(acceleration.z);
    this.lineChartLabels.push('');
  }

  cleanData(){
    this.lineChartData[0].data = [];
    this.lineChartData[1].data = [];
    this.lineChartData[2].data = [];
    this.lineChartLabels = [];
  }

}
