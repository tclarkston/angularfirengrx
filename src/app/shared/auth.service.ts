import { TrainingService } from './training.service';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { IAuthData } from "../auth/models/auth-data.model";
import { IUser } from "../auth/models/user.model";

@Injectable()
export class AuthService {
  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {

  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training'])
      } else{
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: IAuthData) {
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
      ;
  }

  login(authData: IAuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
      ;

    this.authChange.next(true)
  }

  logout() {
    this.afAuth.signOut();

  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

}