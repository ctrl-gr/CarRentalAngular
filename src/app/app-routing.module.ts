import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from "./pages/user-list/user-list.component";
import { AddUserComponent } from "./pages/add-user/add-user.component";
import { HomepageComponent} from "./pages/homepage/homepage.component";
import {CarListComponent} from "./pages/car-list/car-list.component";
import {AddCarComponent} from "./pages/add-car/add-car.component";
import {BookingListComponent} from "./pages/booking-list/booking-list.component";
import {AddBookingComponent} from "./pages/add-booking/add-booking.component";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent},
  { path: 'users', component: UserListComponent },
  { path: 'cars', component: CarListComponent},
  { path: 'add', component: AddUserComponent},
  {path: 'newcar', component: AddCarComponent},
  {path: 'newbooking', component: AddBookingComponent},
  {path: 'bookings', component: BookingListComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot((routes))],
  exports: [RouterModule]
})
export class AppRoutingModule { }
