import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MyTableComponent } from './components/my-table/my-table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import {OrderByPipe} from "./pipes/sorting.pipe";
import { MyNavbarComponent } from './components/my-navbar/my-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService} from './services/in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from './entities/user/user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarComponent } from './entities/car/car.component';
import { BookingComponent } from './entities/booking/booking.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { AddBookingComponent } from './pages/add-booking/add-booking.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    MyTableComponent,
    SearchFilterPipe,
    PaginationPipe,
    OrderByPipe,
    MyNavbarComponent,
    UserComponent,
    UserListComponent,
    AddUserComponent,
    HomepageComponent,
    CarListComponent,
    CarComponent,
    BookingComponent,
    BookingListComponent,
    AddCarComponent,
    AddBookingComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatIconModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, // remove it when a real server is ready to receive requests
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
