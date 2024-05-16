import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { UsuarioListagemComponent } from './usuario-listagem/usuario-listagem.component';
import { UsuarioEdicaoComponent } from './usuario-edicao/usuario-edicao.component';
import { UsuarioAfastamentoComponent } from './usuario-afastamento/usuario-afastamento.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { NgxMaskDirective } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsuarioCadastroComponent,
    UsuarioPerfilComponent,
    UsuarioListagemComponent,
    UsuarioEdicaoComponent,
    UsuarioAfastamentoComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    InputMaskModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
})
export class UsuariosModule {}
