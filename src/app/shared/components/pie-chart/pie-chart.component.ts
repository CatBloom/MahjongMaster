import { Component, Input, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input('pieData') pieData!: number[];

  // datasets
  public pieChartData: ChartConfiguration['data'] = {
    labels: ['1位', '2位', '3位', '4位'],
    datasets: [
      {
        data: [],
      },
    ],
  };

  // options
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        onClick: function () {
          return false;
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.formattedValue + '回';
          },
        },
      },
      datalabels: {
        font: {
          weight: 'bold',
          size: 15,
        },
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            let label = ctx.chart.data.labels[ctx.dataIndex];
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += Number(data);
            });
            let percentage: string = ':' + ((value * 100) / sum).toFixed(1) + '%';
            return percentage ? label + percentage : label;
          }
        },
      },
    },
  };

  public pieChartPlugins = [DatalabelsPlugin];

  constructor() {}

  ngOnInit(): void {
    this.pieChartData.datasets = [{ data: this.pieData }];
  }
}
