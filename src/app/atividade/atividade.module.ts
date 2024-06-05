import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtividadeRoutingModule } from './atividade-routing.module';
import { AtividadeComponent } from './atividade/atividade.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AtividadeComponent
  ],
  imports: [
    CommonModule,
    AtividadeRoutingModule,
    FormsModule,
  ]
})
export class AtividadeModule { }
