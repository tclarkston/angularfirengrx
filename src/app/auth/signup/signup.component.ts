import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date = new Date();

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  onSubmit(form: NgForm){
    console.log(form);
  }

  getErrorMessage(){
   
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
