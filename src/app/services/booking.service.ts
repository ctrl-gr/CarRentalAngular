import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Booking} from "../models/booking/booking-config";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl = 'api/bookings';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl)
      .pipe(
        catchError(this.handleError<Booking[]>('getBookings', []))
      );
  }


  getBooking(id: number): Observable<Booking> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.get<Booking>(url).pipe(
      catchError(this.handleError<Booking>(`getBooking id=${id}`))
    );
  }


  addApproveBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking, this.httpOptions).pipe(
      catchError(this.handleError<Booking>('addBooking'))
    );
  }

  deleteBooking(id: number): Observable<Booking> {
    const url = `${this.bookingsUrl}/${id}`;

    return this.http.delete<Booking>(url, this.httpOptions).pipe(
      catchError(this.handleError<Booking>('deleteBooking'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    }
  }

}
