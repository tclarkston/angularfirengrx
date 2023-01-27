import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import * as fromRoot from './../shared/store/app.reducer'
import { Store } from '@ngrx/store';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router){

  }
  canLoad(route: Route, segments: UrlSegment[]) {
    if(this.store.select(fromRoot.getIsAuth)){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }  
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth)
  }
}