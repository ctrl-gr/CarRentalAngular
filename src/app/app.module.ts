import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MyButtonComponent} from './components/my-button/my-button.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MyTableComponent} from './components/my-table/my-table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchFilterPipe} from './pipes/search-filter.pipe';
import {PaginationPipe} from './pipes/pagination.pipe';
import {OrderByPipe} from "./pipes/sorting.pipe";
import {MyNavbarComponent} from './components/my-navbar/my-navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserListComponent} from './pages/user-list/user-list.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {CarListComponent} from './pages/car-list/car-list.component';
import {BookingListComponent} from './pages/booking-list/booking-list.component';
import {AddCarComponent} from './pages/add-car/add-car.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthInterceptor} from "./auth/auth-interceptor";
import {SetBookingComponent} from './pages/set-booking/set-booking.component';
import {CommonModule} from "@angular/common";
import {AuthGuardService} from "./auth/auth.guard.service";
import {RoleGuardService} from "./auth/role.guard.service";
import {MyDynamicFormComponent} from './components/my-dynamic-form/my-dynamic-form.component';
import {
  MyDynamicFormQuestionComponent
} from "./components/my-dynamic-form/my-dynamic-form-question/my-dynamic-form-question.component";


@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    MyTableComponent,
    SearchFilterPipe,
    PaginationPipe,
    OrderByPipe,
    MyNavbarComponent,
    UserListComponent,
    AddUserComponent,
    HomepageComponent,
    CarListComponent,
    BookingListComponent,
    AddCarComponent,
    LoginComponent,
    SetBookingComponent,
    MyDynamicFormComponent,
    MyDynamicFormQuestionComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    NoopAnimationsModule,
    MatIconModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuardService, RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
