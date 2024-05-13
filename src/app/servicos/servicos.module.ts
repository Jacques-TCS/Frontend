import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServicosRoutingModule } from './servicos-routing.module';
import { ServicoOcorrenciaComponent } from './servico-ocorrencia/servico-ocorrencia.component';
import { ServicoListagemComponent } from './servico-listagem/servico-listagem.component';

@NgModule({
  declarations: [
    ServicoOcorrenciaComponent,
    ServicoListagemComponent,
  ],
  imports: [CommonModule, ServicosRoutingModule, FormsModule],
})
export class ServicosModule {}
