import { Observable } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromApp from './../../shared/store/app.reducer'
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  // private subs = new Subscription();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}>) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(state => state.ui.isLoading);
    this.store.subscribe(data => console.log(data));

    // this.subs.add(this.uiService.loadingStateChanged.subscribe(response => {
    //   this.isLoading = response;
    // }));
  }

  // ngOnDestroy(): void {
  //   if (this.subs) {
  //     this.subs.unsubscribe();
  //   }
  // }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

  get f() {
    return this.loginForm.controls;
  }
}
