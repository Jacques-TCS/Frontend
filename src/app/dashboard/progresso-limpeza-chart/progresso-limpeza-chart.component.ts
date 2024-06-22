import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor() {}

  ngOnInit() {
    this.initializeChartOptions();
    this.setupThemeObserver();
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  initializeChartOptions() {
    const isDarkMode = document.documentElement.classList.contains('dark'); // Check if dark mode is enabled on <html> element
    const prefersDarkMode = isDarkMode ? '#4B5563' : '#F9FAFB'; // Choose text color based on theme

    const numbers = {
      toDo: 12,
      inProgress: 23,
      completed: 64
    };

    const totalTasks = numbers.toDo + numbers.inProgress + numbers.completed;

    this.progressoLimpezaChart = {
      series: [numbers.toDo, numbers.inProgress, numbers.completed],
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
