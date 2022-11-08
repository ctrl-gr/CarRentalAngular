import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from "./user-list/user-list.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { HomepageComponent} from "./homepage/homepage.component";
import {CarListComponent} from "./car-list/car-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent},
  { path: 'users', component: UserListComponent },
  { path: 'cars', component: CarListComponent},
  { path: 'add', component: AddUserComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot((routes))],
  exports: [RouterModule]
})
export class AppRoutingModule { }
