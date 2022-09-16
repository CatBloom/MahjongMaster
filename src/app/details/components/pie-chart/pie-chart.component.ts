import { Component, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration } from 'chart.js';
import { PieData } from '../../../interfaces/result';
import { BaseChartDirective } from 'ng2-charts';
import { ThemeService } from 'src/app/services/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnDestroy {
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
    layout: {
      padding: {
        top: 20,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
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
  onDestroy$ = new Subject<boolean>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.theme$.pipe(takeUntil(this.onDestroy$)).subscribe((theme) => {
      if (theme === 'dark') {
        if (this.pieChartOptions?.plugins?.datalabels?.color) {
          this.pieChartOptions.plugins.datalabels.color = 'white';
        }
        this.pieChartOptions = { ...this.pieChartOptions };
      } else {
        if (this.pieChartOptions?.plugins?.datalabels?.color) {
          this.pieChartOptions.plugins.datalabels.color = 'rgba(0, 0, 0, 0.5)';
        }
        this.pieChartOptions = { ...this.pieChartOptions };
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
