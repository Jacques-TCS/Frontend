import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CronogramaListagemConcorrenteComponent } from './cronograma-listagem-concorrente/cronograma-listagem-concorrente.component';
import { CronogramaListagemTerminalComponent } from './cronograma-listagem-terminal/cronograma-listagem-terminal.component';
import { CronogramaHomeComponent } from './cronograma-home/cronograma-home.component';
import { CronogramaCadastroTerminalComponent } from './cronograma-cadastro-terminal/cronograma-cadastro-terminal.component';
import { CronogramaCadastroConcorrenteComponent } from './cronograma-cadastro-concorrente/cronograma-cadastro-concorrente.component';

const routes: Routes = [
  { path: '', component: CronogramaHomeComponent },
  { path: 'cadastroT', component: CronogramaCadastroTerminalComponent },
  { path: 'cadastroC', component: CronogramaCadastroConcorrenteComponent },
  { path: 'listagemT', component: CronogramaListagemTerminalComponent },
  { path: 'listagemC', component: CronogramaListagemConcorrenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CronogramaRoutingModule { }
