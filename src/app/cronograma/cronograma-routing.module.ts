import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CronogramaCadastroComponent } from './cronograma-cadastro/cronograma-cadastro.component';
import { CronogramaListagemConcorrenteComponent } from './cronograma-listagem-concorrente/cronograma-listagem-concorrente.component';
import { CronogramaListagemTerminalComponent } from './cronograma-listagem-terminal/cronograma-listagem-terminal.component';

const routes: Routes = [
  { path: '', component: CronogramaCadastroComponent },
  { path: 'listagemC', component: CronogramaListagemConcorrenteComponent },
  { path: 'listagemT', component: CronogramaListagemTerminalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CronogramaRoutingModule { }
