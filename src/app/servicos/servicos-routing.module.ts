import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoOcorrenciaComponent } from './servico-ocorrencia/servico-ocorrencia.component';
import { ServicoListagemGerenciaComponent } from './servico-listagem-gerencia/servico-listagem-gerencia.component';

const routes: Routes = [
  { path: 'listagem/gerencia', component: ServicoListagemGerenciaComponent },
  { path: 'ocorrencia', component: ServicoOcorrenciaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
