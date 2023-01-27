import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router){

  }
  canLoad(route: Route, segments: UrlSegment[]) {
    if(this.authService.isAuth()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }  
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