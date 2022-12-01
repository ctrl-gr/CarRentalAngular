import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Car} from "../../models/car-config";
import {CarService} from "../../services/car.service";
import {isString} from "lodash";
import {ActivatedRoute} from "@angular/router";
import {MyButtonConfig} from "../../components/my-button/my-button-config";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  car !: Car
  cars: Car[] = []
  carform!: FormGroup;
  carSaved !: boolean
  isEditMode !: boolean
  carToEdit !: string
 @Input() buttonConfig !: MyButtonConfig

  constructor(
    private carService: CarService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params && isString(params['cartoedit'])) {
        this.carToEdit = params['cartoedit']
        this.isEditMode = true
        this.getCarToEdit(this.carToEdit)
      }
    })

    this.carSaved = false
    this.carform = new FormGroup({
      licensePlate: new FormControl(null, Validators.required),
      manufacturer: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      seats: new FormControl(null, Validators.required)
    })

    this.buttonConfig = {
      customCssClass: 'btn btn-primary',
      text: 'Save car',
      isDisabled: !this.carform.valid
    };
    console.log(this.buttonConfig.isDisabled)
  }

  getCarToEdit(licensePlate: string) {
    licensePlate = this.carToEdit
    this.carService.getCarByLicensePlate(licensePlate).subscribe(car => {
      this.carform.patchValue({
        licensePlate: car.licensePlate,
        manufacturer: car.manufacturer,
        model: car.model,
        type: car.type,
        year: car.year,
        seats: car.seats
      })
    })

  }

  editCar() {
      this.car = this.carform.value
      let licensePlate = this.car.licensePlate
      console.log(this.car)
      this.carService
        .editCar(this.car, licensePlate)
        .subscribe(() =>  this.car)
    this.carform.reset()
  }

  saveCar() {
    this.car = this.carform.value
    console.log(this.car)
    this.carService
      .addCar(this.car)
      .subscribe(data =>  this.car)
    this.carSaved = true
  }

}

