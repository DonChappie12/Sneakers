import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SneakerService } from '../sneaker.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {

  allShoes;

  constructor(private _http: HttpService, private sneak: SneakerService) { }

  ngOnInit(): void {
    this.sneak.getAllSneakers().subscribe(data => {
      this.allShoes = data
    })
  }

}
