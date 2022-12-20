import {Component, Input, OnInit} from '@angular/core';
import {Car} from "../../models/car-config";
import {CarService} from "../../services/car.service";
import {isString} from "lodash";
import {ActivatedRoute, Router} from "@angular/router";
import {MyButtonConfig} from "../../components/my-button/my-button-config";
import {QuestionBase} from "../../components/my-dynamic-form/question-base";
import {QuestionService} from "../../components/my-dynamic-form/question.service";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  providers: [QuestionService]
})
export class AddCarComponent implements OnInit {
  car !: Car
  cars: Car[] = []
  carSaved !: boolean
  alert !: boolean
  isEditMode !: boolean
  carToEdit !: string
  message !: string
  @Input() buttonConfig !: MyButtonConfig
  questions!: QuestionBase<any>[];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {

  }

  ngOnInit() {
    this.questions = this.questionService.getCarQuestions()
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && isString(params['cartoedit'])) {
        this.carToEdit = params['cartoedit']
        this.isEditMode = true
        this.getCarToEdit(this.carToEdit)
      }
    })

    this.carSaved = false

  }

  getCarToEdit(licensePlate: string) {

    licensePlate = this.carToEdit
    this.carService.getCarByLicensePlate(licensePlate).subscribe(car => {
      this.questions = this.questionService.getCarQuestions(car)
    })
  }

  editCar(event: any) {
    let licensePlate = this.carToEdit
    this.carService
      .editCar(event, licensePlate)
      .subscribe(() => this.car)
    this.carSaved = true
    this.alert = true
    this.message = 'Car edited successfully.'


  }

  saveCar(event: any) {
    this.carService
      .addCar(event)
      .subscribe(data => this.car)
    this.carSaved = true
    this.alert = true
    this.message = 'Car saved successfully.'
  }

  closeAlert() {
    this.carSaved = false
    this.router.navigate(['cars'])
  }

}

