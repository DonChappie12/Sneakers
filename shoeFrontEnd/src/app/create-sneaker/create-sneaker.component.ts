import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { SneakerService } from '../sneaker.service';

@Component({
  selector: 'app-create-sneaker',
  templateUrl: './create-sneaker.component.html',
  styleUrls: ['./create-sneaker.component.css']
})
export class CreateSneakerComponent implements OnInit {

  sneakerForm;
  errors = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
    private sneak: SneakerService) {

    this.sneakerForm = fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      sex: ['', Validators.required],
      price: [null, Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    // TODO getting net::ERR_INCOMPLETE_CHUNKED_ENCODING 200 (OK) but still adding shoe to DB
    this.sneak.createSneaker(this.sneakerForm.value).subscribe(data =>{
      console.log(data)
    //   if('errors' in data){
    //     this.errors = [];
    //     for(let key in data.errors){
    //       this.errors.push(data['errors'][key]['message'])
    //     }
    //   }
    //   else{
    //     this.router.navigate(['/'])
    //   }
    })

    this.router.navigate(['/'])
  }
}
