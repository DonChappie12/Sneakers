import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list-data',
  templateUrl: './user-list-data.component.html',
  styleUrls: ['./user-list-data.component.css']
})
export class UserListDataComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'role', 'email', 'actions']
  allUsers;

  constructor(private _http:HttpService) { }

  ngOnInit(): void {
    this._http.getAllUsers().subscribe(data => {
      this.allUsers = data
    })
  }

  applyFilter(){
    // TODO filter actions goes here
  }

}
