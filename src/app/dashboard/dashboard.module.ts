import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProgressoLimpezaChartComponent } from './progresso-limpeza-chart/progresso-limpeza-chart.component';
import { HistoricoOcorrenciaChartComponent } from './historico-ocorrencia-chart/historico-ocorrencia-chart.component';
import { MetaFuncionariosChartComponent } from './meta-funcionarios-chart/meta-funcionarios-chart.component';

@NgModule({
  declarations: [HomeComponent, ProgressoLimpezaChartComponent, HistoricoOcorrenciaChartComponent, MetaFuncionariosChartComponent],
  imports: [CommonModule, DashboardRoutingModule, NgApexchartsModule],
})
export class DashboardModule {}
