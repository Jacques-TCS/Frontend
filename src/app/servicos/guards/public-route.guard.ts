import { CanActivateFn } from '@angular/router';

export const publicRouteGuard: CanActivateFn = (route, state) => {
  return true;
};
