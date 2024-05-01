import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('../usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'servicos',
    loadChildren: () =>
      import('../servicos/servicos.module').then((m) => m.ServicosModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
