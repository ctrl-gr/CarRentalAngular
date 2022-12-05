import {Injectable} from '@angular/core';
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
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getBookings(): Observable<Booking[]> {
    const url = `${this.bookingsUrl}/all`;
    return this.http.get<Booking[]>(url)
      .pipe(
        catchError(this.handleError<Booking[]>('all', []))
      );
  }


  getMyBookings(username: string): Observable<Booking[]> {
    const url = `${this.bookingsUrl}/my-bookings/${username}`;
    return this.http.get<Booking[]>(url).pipe(
      catchError(this.handleError<Booking[]>(`my-bookings/${username}`))
    );
  }


  addBooking(licensePlate: string, username: string, startDate: Date, endDate: Date): Observable<any> {
    const url = `${this.bookingsUrl}/save`;
    return this.http.post<Booking>(url, null, {
      params: {
        licensePlate: licensePlate,
        username: username,
        startDate: startDate.toString(),
        endDate: endDate.toString()
      }
    }).pipe(
      catchError(this.handleError<Booking>('save'))
    );
  }

  approveBooking(booking: Booking): Observable<Booking> {
    const url = `${this.bookingsUrl}/approve`;
    console.log('ready to send this booking', booking)
    return this.http.put<Booking>(url, booking, this.httpOptions).pipe(
      catchError(this.handleError<Booking>('approve'))
    );
  }

  deleteBooking(booking: Booking): Observable<any> {
    const url = `${this.bookingsUrl}/delete`;
    return this.http.post<Booking>(url, booking, this.httpOptions)
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    }
  }

}
