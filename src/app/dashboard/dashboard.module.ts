import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProgressoLimpezaChartComponent } from './progresso-limpeza-chart/progresso-limpeza-chart.component';
import { HistoricoOcorrenciaChartComponent } from './historico-ocorrencia-chart/historico-ocorrencia-chart.component';
import { ProgressoLimpezaFuncionarioChartComponent } from './progresso-limpeza-funcionario-chart/progresso-limpeza-funcionario-chart.component';

@NgModule({
  declarations: [HomeComponent, ProgressoLimpezaChartComponent, HistoricoOcorrenciaChartComponent, ProgressoLimpezaFuncionarioChartComponent],
  imports: [CommonModule, DashboardRoutingModule, NgApexchartsModule, FormsModule],
})
export class DashboardModule {}
