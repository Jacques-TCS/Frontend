import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServicosRoutingModule } from './servicos-routing.module';
import { ServicoOcorrenciaComponent } from './servico-ocorrencia/servico-ocorrencia.component';
import { ServicoListagemGerenciaComponent } from './servico-listagem-gerencia/servico-listagem-gerencia.component';

@NgModule({
  declarations: [
    ServicoOcorrenciaComponent,
    ServicoListagemGerenciaComponent,
  ],
  imports: [CommonModule, ServicosRoutingModule, FormsModule],
})
export class ServicosModule {}
