import * as fromApp from './../shared/store/app.reducer';
import { UiService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { IAuthData } from "./models/auth-data.model";
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private trainingService: TrainingService, 
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}>) {
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
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.store.dispatch({type: 'STOP_LOADING'});
      })
      .catch(error => {
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackbar(error.message, null, 3000)
      })
      ;
  }

  login(authData: IAuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch({type: 'STOP_LOADING'});
      })
      .catch(error => {
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackbar(error.message, null, 3000)
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