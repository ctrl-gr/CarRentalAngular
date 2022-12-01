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
    const url = `${this.carsUrl}/get-available-cars`;
    return this.http.get<Car[]>(url, {params: {startDate: startDate.toString(), endDate : endDate.toString()}})
      .pipe(
        catchError(this.handleError<Car[]>('get-available-cars', []))
      );
  }

  addCar(car: Car): Observable<Car> {
    const url = `${this.carsUrl}/save`;
    console.log('trying to save this car', car)
    return this.http.post<Car>(url, car, this.httpOptions).pipe(
      catchError(this.handleError<Car>('save'))
    );

  }

  editCar(car: Car, licensePlate : String): Observable<Car> {
    const url = `${this.carsUrl}/edit/${licensePlate}`;
    return this.http.put<Car>(url, car, this.httpOptions).pipe(
      catchError(this.handleError<Car>('edit'))
    );
  }

  getCarByLicensePlate(licensePlate : String): Observable<Car> {
    const url = `${this.carsUrl}/get-car-by-license-plate/${licensePlate}`;
    return this.http.get<Car>(url, this.httpOptions).pipe(
      catchError(this.handleError<Car>(`get-car-by-license-plate/${licensePlate}`))
    );
  }

  deleteCar(licensePlate: string): Observable<Car> {
    const url = `${this.carsUrl}/delete/${licensePlate}`;
    return this.http.delete<Car>(url, this.httpOptions).pipe(
      catchError(this.handleError<Car>('delete/${carId}'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    }
  }

}
