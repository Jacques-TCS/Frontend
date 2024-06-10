import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CronogramaRoutingModule } from './cronograma-routing.module';
import { CronogramaCadastroComponent } from './cronograma-cadastro/cronograma-cadastro.component';
import { CronogramaListagemTerminalComponent } from './cronograma-listagem-terminal/cronograma-listagem-terminal.component';
import { CronogramaListagemConcorrenteComponent } from './cronograma-listagem-concorrente/cronograma-listagem-concorrente.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CronogramaCadastroComponent,
    CronogramaListagemTerminalComponent,
    CronogramaListagemConcorrenteComponent,
  ],
  imports: [
    CommonModule,
    CronogramaRoutingModule,
    FormsModule
  ]
})
export class CronogramaModule { }
