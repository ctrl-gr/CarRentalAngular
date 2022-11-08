import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from "./user-list/user-list.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { HomepageComponent} from "./homepage/homepage.component";
import {CarListComponent} from "./car-list/car-list.component";
import {AddCarComponent} from "./add-car/add-car.component";
import {BookingListComponent} from "./booking-list/booking-list.component";
import {AddBookingComponent} from "./add-booking/add-booking.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent},
  { path: 'users', component: UserListComponent },
  { path: 'cars', component: CarListComponent},
  { path: 'add', component: AddUserComponent},
  {path: 'newcar', component: AddCarComponent},
  {path: 'newbooking', component: AddBookingComponent},
  {path: 'bookings', component: BookingListComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot((routes))],
  exports: [RouterModule]
})
export class AppRoutingModule { }
