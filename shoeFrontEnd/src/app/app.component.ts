import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shoes';

  constructor(private auth: AuthService, private _http: HttpService) { }

  ngOnInit(): void {
    // console.log(this.auth.tokenHeader)
    // console.log(this._http.getUser())
  }

  userAuthenticated(){
    return this.auth.isAuthenticated
  }
  userName(){
    return this.auth.name
  }
  userLoggingOut(){
    this.auth.logout()
  }

}
