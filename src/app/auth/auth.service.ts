import * as fromRoot from './../shared/store/app.reducer';
import * as UI from './../shared/store/ui.actions';
import * as Auth from './store/auth.actions';

import { UiService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { IAuthData } from "./models/auth-data.model";
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: IAuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000)
      })
      ;
  }

  login(authData: IAuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000)
      })
      ;

    this.store.dispatch(new Auth.SetAuthenticated)
  }

  logout() {
    this.afAuth.signOut();
    this.store.dispatch(new Auth.SetUnauthenticated)
  }
}