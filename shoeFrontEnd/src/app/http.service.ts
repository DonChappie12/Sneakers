import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  // getUsers(){}
  // TODO not communication to back
  // getUser(){
  //   return this.http.get(this.BASE_URL + '/user/me', this.auth.tokenHeader).map(res => console.log(res))
  // }
  getUser(){
    return this.http.get(this.BASE_URL + '/user/me', this.auth.tokenHeader).pipe(map(res => res))
  }

  // TODO communicate to back end
  updateMyself(data){
    console.log(data)
    // return this.http.put(this.BASE_URL + '/user/me', data, this.auth.tokenHeader)
  }

  createUser(data){
    return this.http.post(this.BASE_URL + '/user/create', data, this.auth.tokenHeader).subscribe(res => {
      console.log(res)
      this.router.navigate(['/']);
    })
  }

  getAllUsers(){
    return this.http.get(this.BASE_URL+'/user/allUsers', this.auth.tokenHeader)
  }

  getOneUser(id){
    return this.http.get(this.BASE_URL + '/user/' +id, this.auth.tokenHeader)
  }

  updateUser(id, data){
    return this.http.put(this.BASE_URL + '/user/'+id, data, this.auth.tokenHeader)
  }
}
