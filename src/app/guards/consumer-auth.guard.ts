import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const consumerAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    authService.isAuthenticated('consumer') &&
    authService.getCurrentUserType() === 'consumer'
  ) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
