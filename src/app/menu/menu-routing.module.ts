import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { privateRouteGuard } from '../shared/service/guards/private-route.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../usuarios/usuarios.module').then((m) => m.UsuariosModule),
          canActivate: [privateRouteGuard]

      },
      {
        path: 'servicos',
        loadChildren: () =>
          import('../servicos/servicos.module').then((m) => m.ServicosModule),
          canActivate: [privateRouteGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
          canActivate: [privateRouteGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
