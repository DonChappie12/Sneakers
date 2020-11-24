import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateSneakerComponent } from './create-sneaker/create-sneaker.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditMyselfComponent } from './edit-myself/edit-myself.component';
import { UserListDataComponent } from './user-list-data/user-list-data.component';
import { MatTableModule } from '@angular/material/table';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ShoesComponent } from './shoes/shoes.component';
import { ShoeDetailsComponent } from './shoe-details/shoe-details.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CreateSneakerComponent,
    CreateUserComponent,
    EditMyselfComponent,
    UserListDataComponent,
    EditUserComponent,
    ShoesComponent,
    ShoeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
