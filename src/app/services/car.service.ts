import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Car} from "../models/car-config";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsUrl = 'http://localhost:8080/api/cars';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    const url = `${this.carsUrl}/all`;
    return this.http.get<Car[]>(url)
      .pipe(
        catchError(this.handleError<Car[]>('all', []))
      );
  }

  getAvailableCars(startDate: Date , endDate: Date): Observable<Car[]> {
    const url = `${this.carsUrl}/get-available-cars/${startDate}&${endDate}`;
    return this.http.get<Car[]>(url)
      .pipe(
        catchError(this.handleError<Car[]>('get-available-cars', []))
      );
  }


  addEditCar(car: Car): Observable<Car> {
    const url = `${this.carsUrl}/save`;
    return this.http.post<Car>(url, car, this.httpOptions).pipe(
      catchError(this.handleError<Car>('save'))
    );
  }

  editCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions).pipe(
      catchError(this.handleError<Car>('edit/${carId}'))
    );
  }

  deleteCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;

    return this.http.delete<Car>(url, this.httpOptions).pipe(
      catchError(this.handleError<Car>('delete'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    }
  }

}
