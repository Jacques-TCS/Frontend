import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoOcorrenciaComponent } from './servico-ocorrencia/servico-ocorrencia.component';
import { ServicoListagemComponent } from './servico-listagem/servico-listagem.component';

const routes: Routes = [
  { path: 'listagem/servicos', component: ServicoListagemComponent },
  { path: 'ocorrencia', component: ServicoOcorrenciaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
