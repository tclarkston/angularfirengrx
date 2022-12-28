import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isAuth()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}