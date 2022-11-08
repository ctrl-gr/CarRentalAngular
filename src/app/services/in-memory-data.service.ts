import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../user/user-config';
import {Car} from "../car/car-config";
import {formatDate} from "@angular/common";
import {Booking} from "../booking/booking-config";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[]= [
      {id: 1, firstName: 'Mario', lastName: 'Bros', birthDate: new Date(formatDate('01/01/1970', 'dd/MM/yyyy', 'en-US')), username: 'supermario', password: 'ciaociao'},
      {id: 2, firstName: 'Luigi', lastName: 'Bros', birthDate: new Date(formatDate('08/05/1980', 'dd/MM/yyyy', 'en-US')), username: 'superluigi', password: 'notaciao'},
      {id: 3, firstName: 'Sandro', lastName: 'Tonali', birthDate: new Date(formatDate('08/10/2000', 'dd/MM/yyyy', 'en-US')), username: 'sandrino', password: 'sonoforte'}
    ];

    const cars: Car[]= [
      {id: 1, licensePlate: 'EW060YE', manufacturer: 'Mercedes', model: 'A', type: 'Berline', year: 2014, seats: 5},
      {id: 2, licensePlate: 'GA000AA', manufacturer: 'BMW', model: 'X4', type: 'SUV', year: 2022, seats: 5}
    ];

    const bookings: Booking[]= [
      {id: 1, startDate: new Date(), endDate: new Date(formatDate('01/01/1970', 'dd/MM/yyyy', 'en-US')), username: 'superluigi', licensePlate: 'EW060YE', approved: true}, //TODO set up date correctly
      {id: 2, startDate: new Date(), endDate: new Date(formatDate('01/01/1970', 'dd/MM/yyyy', 'en-US')), username: 'sandrino', licensePlate: 'GA000AA', approved: false}

    ];



    return {users, cars, bookings}
  }
  constructor() { }
}
