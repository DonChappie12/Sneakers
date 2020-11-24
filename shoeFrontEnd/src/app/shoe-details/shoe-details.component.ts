import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';
import { SneakerService } from '../sneaker.service';

@Component({
  selector: 'app-shoe-details',
  templateUrl: './shoe-details.component.html',
  styleUrls: ['./shoe-details.component.css']
})
export class ShoeDetailsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _http: HttpService, private sneak: SneakerService) { }

  sneaker;

  ngOnInit(): void {
    this._route.params.subscribe((params: Params)=>{
      this.oneSneaker(params['id'])
    });

    this.sneaker = {
      name: '',
      brand: '',
      price: '',
      sex: '',
      rating: '',
      reviews: [{
        content: ''
      }]
    }
  }

  oneSneaker(id){
    this.sneak.getSneaker(id).subscribe(data => {
      this.sneaker = data
    })
  }

}
