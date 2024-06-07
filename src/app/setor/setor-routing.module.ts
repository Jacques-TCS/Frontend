import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorCadastroComponent } from './setor-cadastro/setor-cadastro.component';
import { SetorListagemComponent } from './setor-listagem/setor-listagem.component';

const routes: Routes = [
  { path: '', component: SetorCadastroComponent },
  { path: 'listagem', component: SetorListagemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule { }
