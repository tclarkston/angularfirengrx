import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date = new Date();

  constructor(private authService: AuthService){

  }
  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  onSubmit(form: NgForm){
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  getErrorMessage(){
   
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
