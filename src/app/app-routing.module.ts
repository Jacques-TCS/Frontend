import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { privateRouteGuard } from './servicos/guards/private-route.guard';
import { publicRouteGuard } from './servicos/guards/public-route.guard';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu',
    redirectTo: 'menu',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [publicRouteGuard]
    canActivate: [publicRouteGuard]
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./menu/menu.module').then((m) => m.MenuModule),
    canActivate: [privateRouteGuard]
    canActivate: [privateRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
