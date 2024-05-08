import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CronogramaRoutingModule } from './cronograma-routing.module';
import { CronogramaCadastroComponent } from './cronograma-cadastro/cronograma-cadastro.component';
import { CronogramaListagemComponent } from './cronograma-listagem/cronograma-listagem.component';


@NgModule({
  declarations: [
    CronogramaCadastroComponent,
    CronogramaListagemComponent
  ],
  imports: [
    CommonModule,
    CronogramaRoutingModule
  ]
})
export class CronogramaModule { }
