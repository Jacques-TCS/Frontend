import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-progresso-limpeza-chart',
  templateUrl: './progresso-limpeza-chart.component.html',
  styleUrls: ['./progresso-limpeza-chart.component.scss']
})
export class ProgressoLimpezaChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public progressoLimpezaChart: Partial<ChartOptions>;
  private observer: MutationObserver;
  @Input() toDo: number;
  @Input() inProgress: number;
  @Input() completed: number;

  constructor() {}

  ngOnInit() {
    this.initializeChartOptions();
    this.setupThemeObserver();
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['toDo'] || changes['inProgress'] || changes['completed']) {
      this.updateChart();
    }
  }

  initializeChartOptions() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const prefersDarkMode = isDarkMode ? '#4B5563' : '#F9FAFB';

    const totalTasks = this.toDo + this.inProgress + this.completed;

    this.progressoLimpezaChart = {
      series: [this.toDo, this.inProgress, this.completed],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          track: {
            background: prefersDarkMode,
          },
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
              formatter: function (val) {
                return Number(val).toFixed(0);
              }
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

  updateChart() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const prefersDarkMode = isDarkMode ? '#4B5563' : '#F9FAFB';
    const totalTasks = this.toDo + this.inProgress + this.completed;

    this.progressoLimpezaChart = {
      series: [this.toDo, this.inProgress, this.completed],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          track: {
            background: prefersDarkMode,
          },
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
              formatter: function (val) {
                return Number(val).toFixed(0);
              }
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

  setupThemeObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          this.initializeChartOptions();
        }
      });
    });

    this.observer.observe(document.documentElement, {
      attributes: true
    });
  }
}
