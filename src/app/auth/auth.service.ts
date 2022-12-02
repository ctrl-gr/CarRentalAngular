import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../models/user-config";
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {UserService} from "../services/user.service";

import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private http: HttpClient, private handler: HttpBackend, public router: Router, private userService: UserService) {
    this.http = new HttpClient(handler);
  }

  server: string = environment.server;
  port: string = environment.port;
  endpoint: string = 'http://localhost:8080/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    console.log('user ready to be sent', user)
    return this.http.post(api, user).pipe(catchError(this.handleError));

  }


  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/authenticate`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.jwttoken);
        console.log('username', user.username, typeof(user.username))
        this.userService.getUserByUsername(user.username).subscribe((user: any) => {
          localStorage.setItem('user', user.username)
          this.router.navigate(['homepage'], {queryParams: {isLogged : true}})
        })
      });
  }


  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null;
  }


  checkIsAdmin(): boolean {
    let authToken = this.getToken()
    if (authToken == null) {
      return false
    } else {
      const decoded: any = jwtDecode(authToken)
      return decoded.roles != null && decoded.roles.toLowerCase() === 'role_admin';
    }
  }


  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.clear()
    if (removeToken == null) {
      this.router.navigate(['login'], {queryParams: {isLogged: false}});
    }
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


}
