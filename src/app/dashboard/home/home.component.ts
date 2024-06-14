import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit() {
    this.initializeChartOptions();
  }

  private initializeChartOptions() {
    const prefersDarkMode = localStorage.getItem('color-theme') === 'dark' ||
                             (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const numbers = {
      toDo: 12,
      inProgress: 23,
      completed: 64
    };

    const totalTasks = numbers.toDo + numbers.inProgress + numbers.completed;

    this.chartOptions = {
      series: [numbers.toDo, numbers.inProgress, numbers.completed],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          track: {
            background: prefersDarkMode ? '#1f2937' : '#f2f2f2',
          },
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function() {
                return totalTasks.toString();
              },
            }
          }
        }
      },
      labels: ["A Fazer", "Em progresso", "Concluídos"]
    };
  }
}
