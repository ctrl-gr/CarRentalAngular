import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {User} from "../models/user-config";


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersUrl = 'http://localhost:8080/api/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  getUsers(): Observable<User[]> {
    const url = `${this.usersUrl}/all`;
    return this.http.get<User[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<User[]>('all', []))
      );
  }

  getUserByUsername(username: String): Observable<User> {
    const url = `${this.usersUrl}/get-user-by-username/${username}`;
    return this.http.get<User>(url, this.httpOptions).pipe(
      catchError(this.handleError<User>(`get-user-by-username/${username}`))
    );
  }


  editUser(user: User, userToEdit: String): Observable<User> {
    const url = `${this.usersUrl}/edit/${userToEdit}`;
    return this.http.put<User>(url, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('edit/${userToEdit}'))
    );
  }


  deleteUser(username: string): Observable<User> {
    const url = `${this.usersUrl}/delete/${username}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      catchError(this.handleError<User>('delete/${username}'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      return of(result as T);
    }
  }

}
