import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: matchPasswords('password', 'confirmPassword')})
  }

  ngOnInit(): void {
  }

  onSubmit(){
    // TODO if registerForm != valid log errors
    // console.log(this.registerForm);
    this.auth.register(this.registerForm.value);
  }

}
// *** Validate that passwords match and are passed as an extra validator through fb.group ***
function matchPasswords(p, cp){
  return form => {
    if(form.controls[p].value !== form.controls[cp].value){
      return { mismatchedFields: true }
    }
  }
}
// *** Validates if email is valid through regex. Is passed as a list in email field ***
function emailValid(){
  return control => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(control.value) ? null : { invalidEmail: true }
  }
}
