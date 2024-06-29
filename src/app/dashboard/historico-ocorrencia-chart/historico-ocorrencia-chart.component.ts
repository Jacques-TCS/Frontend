import { Component, Input, ViewChild, OnInit, OnDestroy, SimpleChanges } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
};

export type OcorrenciasSeries = {
  name: string;
  data: number[];
};

@Component({
  selector: 'app-historico-ocorrencia-chart',
  templateUrl: './historico-ocorrencia-chart.component.html',
  styleUrls: ['./historico-ocorrencia-chart.component.scss']
})
export class HistoricoOcorrenciaChartComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private observer: MutationObserver;
  @Input() series: Array<OcorrenciasSeries> = [];

  constructor() {}

  ngOnInit() {
    this.initializeChartOptions();
    this.setupThemeObserver();
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["series"] && !changes["series"].firstChange) {
      this.updateChartOptions();
    }
  }

  initializeChartOptions() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#FFFFFF' : '#000000';
    const gridColor = isDarkMode ? '#374151' : '#f3f3f3';

    this.chartOptions = {
      series: this.series,
      chart: {
        height: 420,
        type: "line",
        foreColor: textColor,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      grid: {
        row: {
          colors: [gridColor, "transparent"],
          opacity: 0.3
        }
      },
      xaxis: {
        categories: this.generateLastSixMonths(),
        labels: {
          style: {
            colors: textColor
          }
        }
      },
    };
  }

  updateChartOptions() {
    this.initializeChartOptions();
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

  generateLastSixMonths(): string[] {
    let months = [];
    for (let i = 5; i >= 0; i--) {
      let date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleString('pt-br', { month: 'short', year: '2-digit' }));
    }
    return months;
  }
}
