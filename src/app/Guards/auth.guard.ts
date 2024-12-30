import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserServicesService);
  const routes = inject(Router);
  
  if(userService.isLoggedIn()) {
    return true;
  } else {
    routes.navigate(['/login']);
    return false;
  }
};
