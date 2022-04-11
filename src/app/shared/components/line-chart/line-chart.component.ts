import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  // datasets
  public lineChartData: ChartConfiguration['data'] = {
    labels: [
      '2022/02/03/22:00',
      '2022/02/04',
      '2022/02/05',
      '2022/02/06',
      '2022/02/07',
      '2022/02/08',
      '2022/02/09',
      '2022/02/10',
      '2022/02/11',
      '2022/02/12',
    ],
    datasets: [
      {
        data: [1, 1, 3, 2, 4, 2, 3, 1, 4, 4],
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

  ngOnInit(): void {}
}
