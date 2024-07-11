import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const providerAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    authService.isAuthenticated('provider') &&
    authService.getCurrentUserType() === 'provider'
  ) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
