import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {User} from "../models/user-config";



@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = `${this.usersUrl}/all`;
    return this.http.get<User[]>(url)
      .pipe(
        catchError(this.handleError<User[]>('all', []))
      );
  }

  getUserByUsername(username : String): Observable<User> {
    const url = `${this.usersUrl}/get-user-by-username/${username}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`get-user-by-username/${username}`))
    );
  }

  editUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user).pipe(
      catchError(this.handleError<User>('save'))
    );
  }


  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url).pipe(
      catchError(this.handleError<User>('delete/${userId}'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      return of(result as T);
    }
  }

}
