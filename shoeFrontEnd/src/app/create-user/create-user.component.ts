import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUser;

  constructor(private _http: HttpService, private fb: FormBuilder, private router: Router) {
    this.createUser = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, emailValid()]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: matchPasswords('password', 'confirmPassword')})
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._http.createUser(this.createUser.value)
    // this.router.navigate['/']
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
