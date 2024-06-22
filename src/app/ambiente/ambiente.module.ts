import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmbienteRoutingModule } from './ambiente-routing.module';
import { AmbienteCadastroComponent } from './ambiente-cadastro/ambiente-cadastro.component';
import { AmbienteListagemComponent } from './ambiente-listagem/ambiente-listagem.component';


@NgModule({
    declarations: [
        AmbienteCadastroComponent,
        AmbienteListagemComponent
    ],
    imports: [
        CommonModule,
        AmbienteRoutingModule,
        FormsModule
    ]
})
export class AmbienteModule { }