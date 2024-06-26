import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CronogramaRoutingModule } from './cronograma-routing.module';
import { CronogramaListagemTerminalComponent } from './cronograma-listagem-terminal/cronograma-listagem-terminal.component';
import { CronogramaListagemConcorrenteComponent } from './cronograma-listagem-concorrente/cronograma-listagem-concorrente.component';
import { FormsModule } from '@angular/forms';
import { CronogramaHomeComponent } from './cronograma-home/cronograma-home.component';
import { CronogramaCadastroConcorrenteComponent } from './cronograma-cadastro-concorrente/cronograma-cadastro-concorrente.component';
import { CronogramaCadastroTerminalComponent } from './cronograma-cadastro-terminal/cronograma-cadastro-terminal.component';

@NgModule({
  declarations: [
    CronogramaHomeComponent,
    CronogramaCadastroConcorrenteComponent,
    CronogramaCadastroTerminalComponent,
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
