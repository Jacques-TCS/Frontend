import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetorRoutingModule } from './setor-routing.module';
import { SetorCadastroComponent } from './setor-cadastro/setor-cadastro.component';
import { SetorListagemComponent } from './setor-listagem/setor-listagem.component';


@NgModule({
  declarations: [
    SetorCadastroComponent,
    SetorListagemComponent
  ],
  imports: [
    CommonModule,
    SetorRoutingModule
  ]
})
export class SetorModule { }
