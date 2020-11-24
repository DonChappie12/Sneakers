import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:5000/auth';
  TOKEN_KEY = 'token';
  NAME_KEY = 'firstName';

  constructor(private http: HttpClient, private router: Router) { }

  get name(){
    return localStorage.getItem(this.NAME_KEY)
  }

  get isAuthenticated(){
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  get tokenHeader(){
    let header = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)})
    const httpOptions = {headers: header}

    return httpOptions;
  }

  register(user){
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
      this.authenticate(res);
    });
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.NAME_KEY);
    this.router.navigate(['/']);
  }

  login(user){
    this.http.post(this.BASE_URL+'/login', user).subscribe(res => {
      var result = res
      this.authenticate(result);
    })
  }

  authenticate(res){
    var authResponse = res

    if(!authResponse)
      return;

    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.NAME_KEY, authResponse.firstName);
    this.router.navigate(['/']);
  }
}
