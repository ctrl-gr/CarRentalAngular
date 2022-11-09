import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Car} from "../../entities/car/car-config";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  cars: Car[] = []
  carform!: FormGroup;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carform = new FormGroup({
      licensePlate: new FormControl(null, Validators.required),
      manufacturer: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      seats: new FormControl(null, Validators.required)
    })
  }

  addEditCar(carform: FormGroup) {
    //id?
    this.carService.addEditCar({
      id: 1,
      licensePlate: this.carform.value.licensePlate,
      manufacturer: this.carform.value.manufacturer,
      model: this.carform.value.model,
      type: this.carform.value.type,
      year: this.carform.value.year,
      seats: this.carform.value.seats
    })
  }

  onSubmit(form: FormGroup) {
    this.addEditCar(this.carform)
    console.log(this.carform)
  }
}

