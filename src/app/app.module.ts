import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { MyButtonComponent } from './my-button/my-button.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MyTableComponent } from './my-table/my-table.component';
import {FormsModule} from "@angular/forms";
import { SearchFilterPipe } from './search-filter.pipe';
import { PaginationPipe } from './pagination.pipe';
import {OrderByPipe} from "./sorting.pipe";
import { MyNavbarComponent } from './my-navbar/my-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService} from './in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarsComponent } from './cars/cars.component';


@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    MyTableComponent,
    SearchFilterPipe,
    PaginationPipe,
    OrderByPipe,
    MyNavbarComponent,
    UsersComponent,
    UserListComponent,
    AddUserComponent,
    HomepageComponent,
    CarListComponent,
    CarsComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatIconModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, // remove it when a real server is ready to receive requests
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
