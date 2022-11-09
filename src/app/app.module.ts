import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { MyButtonComponent } from './my-button/my-button.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MyTableComponent } from './my-table/my-table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import {OrderByPipe} from "./pipes/sorting.pipe";
import { MyNavbarComponent } from './my-navbar/my-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService} from './services/in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarComponent } from './car/car.component';
import { BookingComponent } from './booking/booking.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import {CustomDatePipe} from "./pipes/custom.datepipe";


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
    CustomDatePipe,
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
