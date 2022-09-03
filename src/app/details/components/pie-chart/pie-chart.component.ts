import { Component, ViewChild, Input, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration } from 'chart.js';
import { PieData } from 'src/app/shared/interfaces/result';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() set pieData(data: PieData) {
    this.pieChartData.labels = data.dateLabels;
    this.pieChartData.datasets = [{ data: data.ranks }];
    this.chart?.update();
  }

  // datasets
  public pieChartData: ChartConfiguration['data'] = {
    labels: [],
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
        labels: {
          color: 'rgb(125, 125, 125)',
        },
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
        color: 'rgb(90, 90, 90)',
        align: 'end',
        anchor: 'center',
        offset: 0,
        font: {
          weight: 'bold',
          size: 15,
        },
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            let sum = 0;
            const dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += Number(data);
            });
            const percentage = ((value * 100) / sum).toFixed(1) + '%';
            return value !== 0 ? label + '\n' + percentage : null;
          }
          return;
        },
      },
    },
  };

  public pieChartPlugins = [DatalabelsPlugin];

  constructor() {}

  ngOnInit(): void {}
}
