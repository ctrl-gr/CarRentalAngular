import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Booking} from "../models/booking-config";


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl = 'http://localhost:8080/api/bookings';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    const url = `${this.bookingsUrl}/all`;
    return this.http.get<Booking[]>(url)
      .pipe(
        catchError(this.handleError<Booking[]>('all', []))
      );
  }


  getMyBookings(username : string): Observable<Booking[]> {
    const url = `${this.bookingsUrl}/my-bookings/${username}`;
    return this.http.get<Booking[]>(url).pipe(
      catchError(this.handleError<Booking[]>(`my-bookings&id=${username}`))
    );
  }


  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking, this.httpOptions).pipe(
      catchError(this.handleError<Booking>('save'))
    );
  }

  approveBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking, this.httpOptions).pipe(
      catchError(this.handleError<Booking>('approve/${bookingId}'))
    );
  }

  deleteBooking(id: number): Observable<Booking> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.delete<Booking>(url, this.httpOptions).pipe(
      catchError(this.handleError<Booking>('delete'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    }
  }

}
