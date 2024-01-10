import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})

class PermissionsService {

    constructor(private router:Router, private jwtHelper: JwtHelperService) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)){
            return true;
        }
        this.router.navigate(["/"]);
        return false;
    }
  }
  
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
}