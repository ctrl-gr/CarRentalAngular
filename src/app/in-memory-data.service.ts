import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user/user-config';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[]= [
      {id: 1, firstName: 'Mario', lastName: 'Bros', birthDate: new Date (1970-1-1), username: 'supermario', password: 'ciaociao'},
      {id: 2, firstName: 'Luigi', lastName: 'Bros', birthDate: new Date (1980-5-8), username: 'superluigi', password: 'notaciao'},
      {id: 3, firstName: 'Sandro', lastName: 'Tonali', birthDate: new Date (2000-10-8), username: 'sandrino', password: 'sonoforte'}
    ];

    return {users}
  }
  constructor() { }
}
