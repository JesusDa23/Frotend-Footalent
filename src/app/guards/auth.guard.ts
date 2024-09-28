import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
  if (sessionStorage.getItem('token') == null) {
    const redirectTo = _router.createUrlTree(['/login']);
    return redirectTo;
  } else {
    return true;
  }
};
