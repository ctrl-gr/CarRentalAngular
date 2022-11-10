import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../models/user-config';
import {Car} from "../models/car-config";
import {formatDate} from "@angular/common";
import {Booking} from "../models/booking-config";
import * as moment from 'moment';




@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      {
        id: 1,
        firstName: 'Mario',
        lastName: 'Bros',
        birthDate: moment.utc('01/01/1970','L').toDate(), // TODO remove time
        username: 'supermario',
        password: 'ciaociao'
      },
      {
        id: 2,
        firstName: 'Luigi',
        lastName: 'Bros',
        birthDate: moment.utc('08/08/1985','L').toDate(),
        username: 'superluigi',
        password: 'notaciao'
      },
      {
        id: 3,
        firstName: 'Sandro',
        lastName: 'Tonali',
        birthDate: moment.utc('08/05/2000','L').toDate(),
        username: 'sandrino',
        password: 'sonoforte'
      }
    ];

    const cars: Car[] = [
      {id: 1, licensePlate: 'EW060YE', manufacturer: 'Mercedes', model: 'A', type: 'Berline', year: 2014, seats: 5},
      {id: 2, licensePlate: 'GA000AA', manufacturer: 'BMW', model: 'X4', type: 'SUV', year: 2022, seats: 5}
    ];

    const bookings: Booking[] = [
      {
        id: 1,
        startDate: moment.utc('11/08/2022','L').toDate(),
        endDate: moment.utc('11/25/2022','L').toDate(),
        username: 'superluigi',
        licensePlate: 'EW060YE',
        approved: true
      },
      {
        id: 2,
        startDate: moment.utc('12/08/2022','L').toDate(),
        endDate: moment.utc('12/15/2022','L').toDate(),
        username: 'sandrino',
        licensePlate: 'GA000AA',
        approved: false
      }

    ];

    return {users, cars, bookings}
  }
}




