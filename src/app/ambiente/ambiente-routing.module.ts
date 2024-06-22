import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbienteListagemComponent } from './ambiente-listagem/ambiente-listagem.component';
import { AmbienteCadastroComponent } from './ambiente-cadastro/ambiente-cadastro.component';

const routes: Routes = [
  { path: '', component: AmbienteCadastroComponent },
  { path: 'listagem', component: AmbienteListagemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmbienteRoutingModule { }
