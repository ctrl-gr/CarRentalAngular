import {Injectable} from '@angular/core';

import {QuestionBase} from './question-base';
import {TextboxQuestion} from './question-textbox';
import {User} from "../../models/user-config";
import {Car} from "../../models/car-config";


@Injectable()
export class QuestionService {


  getUserQuestions(user ?: User) {

    const userQuestions: QuestionBase<string>[] = [


      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        value: user && user.firstName,
        order: 1
      }),

      new TextboxQuestion({
        key: 'lastName',
        label: 'Last name',
        required: true,
        value: user && user.lastName,
        order: 2
      }),

      new TextboxQuestion({
        key: 'birthDate',
        label: 'BirthDate',
        type: 'date',
        required: true,
        value: user && user.birthDate,
        order: 3
      }),

      new TextboxQuestion({
        key: 'username',
        label: 'username',
        required: true,
        value: user && user.username,
        order: 4
      }),

      new TextboxQuestion({
        key: 'password',
        label: 'password',
        required: true,
        value: user && user.password,
        order: 5
      })
    ];
    return userQuestions;
  }

  getCarQuestions(car ?: Car) {

    const carQuestions: QuestionBase<string>[] = [


      new TextboxQuestion({
        key: 'licensePlate',
        label: 'License plate',
        required: true,
        value: car && car.licensePlate,
        order: 1
      }),

      new TextboxQuestion({
        key: 'manufacturer',
        label: 'Model',
        required: true,
        value: car && car.manufacturer,
        order: 2
      }),

      new TextboxQuestion({
        key: 'model',
        label: 'model',
        required: true,
        value: car && car.model,
        order: 3
      }),

      new TextboxQuestion({
        key: 'type',
        label: 'type',
        required: true,
        value: car && car.type,
        order: 4
      }),

      new TextboxQuestion({
        key: 'year',
        label: 'year',
        type: 'number',
        required: true,
        value: car && car.year,
        order: 5
      }),
      new TextboxQuestion({
        key: 'seats',
        label: 'seats',
        type: 'number',
        required: true,
        value: car && car.seats,
        order: 6
      })
    ];

    return carQuestions;
  }
}
