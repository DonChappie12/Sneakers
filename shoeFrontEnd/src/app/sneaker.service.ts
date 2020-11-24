import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SneakerService {

  BASE_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private auth: AuthService) { }

  createSneaker(data){
    return this.http.post(this.BASE_URL + '/shoe/createShoe', data, this.auth.tokenHeader)
  }

  getAllSneakers(){
    return this.http.get(this.BASE_URL + '/shoe')
  }

  getSneaker(id){
    // return this.http.get(`${this.BASE_URL}/shoe/{id}`)
    return this.http.get(this.BASE_URL + '/shoe/' + id)
  }
}
