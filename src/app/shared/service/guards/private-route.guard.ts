import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

export const privateRouteGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
