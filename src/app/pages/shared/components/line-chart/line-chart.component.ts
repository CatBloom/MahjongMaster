import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() lineLabels!: string[];
  @Input() lineData!: number[];
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
        min: 0.5,
        max: 4.4,
        ticks: {
          stepSize: 1,
          callback: function (ticks) {
            if (ticks === 0.5 || ticks === 4.4) {
              return;
            }
            return ticks + '位';
          },
        },
        reverse: true,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.lineChartData.labels = this.lineLabels;
    this.lineChartData.datasets = [{ data: this.lineData }];
  }
}
