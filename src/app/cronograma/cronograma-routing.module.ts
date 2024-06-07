import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CronogramaCadastroComponent } from './cronograma-cadastro/cronograma-cadastro.component';
import { CronogramaListagemComponent } from './cronograma-listagem/cronograma-listagem.component';

const routes: Routes = [
  { path: '', component: CronogramaCadastroComponent },
  { path: 'listagem', component: CronogramaListagemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CronogramaRoutingModule { }
