import { Component, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexMarkers,
  ApexFill,
  ApexForecastDataPoints,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  colors: string[];
  fill: ApexFill;
  forecastDataPoints: ApexForecastDataPoints;
  legend: ApexLegend;
};

@Component({
  selector: 'app-historico-ocorrencia-chart',
  templateUrl: './historico-ocorrencia-chart.component.html',
  styleUrls: ['./historico-ocorrencia-chart.component.scss']
})
export class HistoricoOcorrenciaChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
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
    const isDarkMode = document.documentElement.classList.contains('dark'); 
    const textColor = isDarkMode ? '#FFFFFF' : '#000000';

    this.chartOptions = {
      series: [
        {
          type: "rangeArea",
          name: "Team B Range",

          data: [
            {
              x: "Jan",
              y: [1100, 1900]
            },
            {
              x: "Feb",
              y: [1200, 1800]
            },
            {
              x: "Mar",
              y: [900, 2900]
            },
            {
              x: "Apr",
              y: [1400, 2700]
            },
            {
              x: "May",
              y: [2600, 3900]
            },
            {
              x: "Jun",
              y: [500, 1700]
            },
            {
              x: "Jul",
              y: [1900, 2300]
            },
            {
              x: "Aug",
              y: [1000, 1500]
            }
          ]
        },

        {
          type: "rangeArea",
          name: "Team A Range",
          data: [
            {
              x: "Jan",
              y: [3100, 3400]
            },
            {
              x: "Feb",
              y: [4200, 5200]
            },
            {
              x: "Mar",
              y: [3900, 4900]
            },
            {
              x: "Apr",
              y: [3400, 3900]
            },
            {
              x: "May",
              y: [5100, 5900]
            },
            {
              x: "Jun",
              y: [5400, 6700]
            },
            {
              x: "Jul",
              y: [4300, 4600]
            },
            {
              x: "Aug",
              y: [2100, 2900]
            }
          ]
        },

        {
          type: "line",
          name: "Team B Median",
          data: [
            {
              x: "Jan",
              y: 1500
            },
            {
              x: "Feb",
              y: 1700
            },
            {
              x: "Mar",
              y: 1900
            },
            {
              x: "Apr",
              y: 2200
            },
            {
              x: "May",
              y: 3000
            },
            {
              x: "Jun",
              y: 1000
            },
            {
              x: "Jul",
              y: 2100
            },
            {
              x: "Aug",
              y: 1200
            },
            {
              x: "Sep",
              y: 1800
            },
            {
              x: "Oct",
              y: 2000
            }
          ]
        },
        {
          type: "line",
          name: "Team A Median",
          data: [
            {
              x: "Jan",
              y: 3300
            },
            {
              x: "Feb",
              y: 4900
            },
            {
              x: "Mar",
              y: 4300
            },
            {
              x: "Apr",
              y: 3700
            },
            {
              x: "May",
              y: 5500
            },
            {
              x: "Jun",
              y: 5900
            },
            {
              x: "Jul",
              y: 4500
            },
            {
              x: "Aug",
              y: 2400
            },
            {
              x: "Sep",
              y: 2100
            },
            {
              x: "Oct",
              y: 1500
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeArea",
        animations: {
          speed: 500
        },
        foreColor: textColor,
      },
      colors: ["#d4526e", "#33b2df", "#d4526e", "#33b2df"],
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: [0.24, 0.24, 1, 1]
      },
      forecastDataPoints: {
        count: 2,
        dashArray: 4
      },
      stroke: {
        curve: "straight",
        width: [0, 0, 2, 2]
      },
      legend: {
        show: true,
        customLegendItems: ["Mal cheiro", "Superfície contaminada"],
        inverseOrder: true
      },
      markers: {
        hover: {
          sizeOffset: 5
        }
      }
    };
  }


  setupThemeObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          this.initializeChartOptions(); // Re-initialize chart options on theme change
        }
      });
    });

    this.observer.observe(document.documentElement, {
      attributes: true
    });
  }
}
