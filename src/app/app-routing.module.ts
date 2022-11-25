import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from "./pages/user-list/user-list.component";
import { AddUserComponent } from "./pages/add-user/add-user.component";
import { HomepageComponent} from "./pages/homepage/homepage.component";
import {CarListComponent} from "./pages/car-list/car-list.component";
import {AddCarComponent} from "./pages/add-car/add-car.component";
import {BookingListComponent} from "./pages/booking-list/booking-list.component";
import {LoginComponent} from "./pages/login/login.component";
import {SetBookingComponent} from "./pages/set-booking/set-booking.component";
import {AuthGuardService} from "./auth/auth.guard.service";
import {RoleGuardService} from "./auth/role.guard.service";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuardService]},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'cars', component: CarListComponent, canActivate: [AuthGuardService, RoleGuardService]},
  { path: 'newuser', component: AddUserComponent},
  {path: 'newcar', component: AddCarComponent, canActivate: [AuthGuardService, RoleGuardService]},
  {path: 'newbooking', component: SetBookingComponent, canActivate: [AuthGuardService]},
  {path: 'bookings', component: BookingListComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot((routes))],
  exports: [RouterModule]
})
export class AppRoutingModule { }
