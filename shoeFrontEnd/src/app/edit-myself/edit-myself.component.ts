import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit-myself',
  templateUrl: './edit-myself.component.html',
  styleUrls: ['./edit-myself.component.css']
})
export class EditMyselfComponent implements OnInit {

  oldUser;
  newUser;

  constructor(private _http: HttpService,private fb: FormBuilder) {
    this.oldUser = fb.group({
      firstName: '',
      lastName: '',
      role:'',
      email: '',
      password: ''
    })

    this.newUser = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, emailValid()]]
    })
  }

  ngOnInit(): void {
    this.getPersonalUser()
  }

  getPersonalUser(){
    this._http.getUser().subscribe(data =>{
      // console.log(data)
      this.oldUser = data;
    })
  }

  onSubmit(){
    console.log(this.newUser)
    this._http.updateMyself(this.newUser.value)
  }

}

// *** Validates if email is valid through regex. Is passed as a list in email field ***
function emailValid(){
  return control => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(control.value) ? null : { invalidEmail: true }
  }
}
