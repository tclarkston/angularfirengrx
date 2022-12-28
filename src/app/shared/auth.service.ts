import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { IAuthData } from "../auth/models/auth-data.model";
import { IUser } from "../auth/models/user.model";

@Injectable()
export class AuthService {
  private user: IUser | null;
  authChange = new Subject<boolean>();

  constructor(private router: Router){

  }

  registerUser(authData: IAuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 50).toString()
    };

    this.authChange.next(true)
    this.authSuccessfully();
  }

  login(authData: IAuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 50).toString()
    };

    this.authChange.next(true)
    this.authSuccessfully();
  }

  logout(){
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/'])
  }

  getUser(){
    return { ...this.user};
  }

  isAuth(): boolean{
    console.log(this.user);
    console.log(this.user !== null && this.user !== undefined);
    return this.user !== null && this.user !== undefined;
  }

  authSuccessfully(){
    this.router.navigate(['/training'])
  }
}