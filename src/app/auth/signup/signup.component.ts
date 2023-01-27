import { AuthService } from '../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import * as fromRoot from './../../shared/store/app.reducer'
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date = new Date();
  isLoading$: Observable<boolean>;
  private subs = new Subscription();
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {

  }
  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
