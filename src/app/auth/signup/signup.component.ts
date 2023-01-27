import { AuthService } from '../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date = new Date();
  isLoading = false;
  private subs = new Subscription();
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) {

  }
  ngOnInit(): void {
    this.subs.add(this.uiService.loadingStateChanged.subscribe(response => {
      this.isLoading = response;
    }));
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
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
