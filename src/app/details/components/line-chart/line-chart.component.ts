import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { LineData } from '../../../interfaces/result';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() set lineData(data: LineData) {
    this.lineChartData.datasets = [{ data: data.ranks }];
    this.lineChartData.labels = data.dateLabels;
    this.chart?.update();
  }
  // datasets
  public lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: 'rgba(148,159,177,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: 'rgba(148,159,177,1)',
      },
    ],
  };

  // opitions
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: () => {
            return '';
          },
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          display: false,
          stepSize: 1,
        },
        reverse: true,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
