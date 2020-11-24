import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _http: HttpService, private fb: FormBuilder, private router: Router) {
    this.newUser = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, emailValid()]],
      role: ['', Validators.required]
    })
  }

  user;
  newUser;

  ngOnInit(): void {
    this._route.params.subscribe((params: Params)=>{
      this.getUser(params['id'])
    });
    this.user= {
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    }
  }

  getUser(id){
    this._http.getOneUser(id).subscribe(data => {
      this.user = data
    })
  }

  onSubmit(){
    console.log(this.newUser.value)
    this._http.updateUser(this.user.id, this.newUser.value).subscribe(data => {
      this.user = data
      this.router.navigate['/allUsers']
    })
  }

}

// *** Validates if email is valid through regex. Is passed as a list in email field ***
function emailValid(){
  return control => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(control.value) ? null : { invalidEmail: true }
  }
}
