import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioEdicaoComponent } from './usuario-edicao/usuario-edicao.component';
import { UsuarioListagemComponent } from './usuario-listagem/usuario-listagem.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { HomeComponent } from '../dashboard/home/home.component';

const routes: Routes = [
  { path: 'cadastro', component: UsuarioCadastroComponent },
  { path: 'edicao/:id', component: UsuarioEdicaoComponent },
  { path: 'listagem', component: UsuarioListagemComponent },
  { path: 'perfil', component: UsuarioPerfilComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule { }
