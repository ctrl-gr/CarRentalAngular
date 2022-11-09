import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Car} from "../models/car/car-config";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsUrl = 'api/cars';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        catchError(this.handleError<Car[]>('getCars', []))
      );
  }


  getCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }


  addEditCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions).pipe(
      catchError(this.handleError<Car>('addCar'))
    );
  }

  deleteCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;

    return this.http.delete<Car>(url, this.httpOptions).pipe(
      catchError(this.handleError<Car>('deleteCar'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    }
  }

}
