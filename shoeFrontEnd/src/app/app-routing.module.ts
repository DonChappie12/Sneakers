import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSneakerComponent } from './create-sneaker/create-sneaker.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditMyselfComponent } from './edit-myself/edit-myself.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShoeDetailsComponent } from './shoe-details/shoe-details.component';
import { ShoesComponent } from './shoes/shoes.component';
import { UserListDataComponent } from './user-list-data/user-list-data.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'newSneaker', component:CreateSneakerComponent},
  {path:'newUser', component:CreateUserComponent},
  {path:'edit', component:EditMyselfComponent},
  {path:'allUsers', component:UserListDataComponent},
  {path:'editUser/:id', component:EditUserComponent},
  {path:'shoes', component:ShoesComponent},
  {path:'shoes/:id', component:ShoeDetailsComponent},
  // {path: '', pathMatch: 'full', redirectTo: 'restaurants'},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
