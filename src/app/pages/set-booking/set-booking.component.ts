import { Component, OnInit } from '@angular/core';
import {Booking} from "../../models/booking-config";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {BookingService} from "../../services/booking.service";
import {
  MyAction,
  MyOrder,
  MyPagination,
  MySearch,
  MyTableActionEnum,
  MyTableConfig
} from "../../components/my-table/my-table-config";
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car-config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-set-booking',
  templateUrl: './set-booking.component.html',
  styleUrls: ['./set-booking.component.css']
})
export class SetBookingComponent implements OnInit {
  tableConfig !: MyTableConfig;
  order !: MyOrder;
  search !: MySearch;
  pagination !: MyPagination;
  actions !: MyAction[];
  data!: any[];
  bookings: Booking[] = []
  bookingform!: FormGroup;
  startDate !: Date;
  endDate !: Date;
  cars: Car[] = [];


  constructor(
    private bookingService: BookingService,
    private carService: CarService,
    public router : Router
  ) { }

  checkDates(bookingform: FormGroup) {
    if(bookingform.controls['endDate'].value < bookingform.controls['startDate'].value) {
      return { notValid:true }
    }
    return null;
  }


  ngOnInit(): void {
    this.bookingform = new FormGroup({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required)
    })
    this.checkDates(this.bookingform)

    this.pagination = {
      itemPerPage: 5,
      itemPerPageOptions: [5, 10, 15]
    }
    this.order = {
      defaultColumn: 'licensePlate',
      orderType: 'asc'
    }

    this.search = {
      columns: this.data
    }

    this.actions = [
      {
        text: 'prenota',
        cssClass: 'btn btn-warning',
        actionType: MyTableActionEnum.BOOK,
        icon: 'check_circle',
        onTop: false
      }
    ]

    this.tableConfig = {
      headers: [
        {
          key: 'licensePlate',
          label: 'targa',
        },
        {
          key: 'manufacturer',
          label: 'Marca',
        },
        {
          key: 'model',
          label: 'modello',
        },
        {
          key: 'type',
          label: 'tipo',
        },
        {
          key: 'year',
          label: 'anno',
        },
        {
          key: 'seats',
          label: 'posti',
        }
      ],
      order: this.order,
      search: this.search,
      pagination: this.pagination,
      actions: this.actions
    }

  }

  onSubmit() {
    this.startDate  = this.bookingform.controls['startDate'].value
    this.endDate = this.bookingform.controls['endDate'].value
  }

  getAvailableCars() {
    this.startDate = this.bookingform.value['startDate']
    this.endDate = this.bookingform.value['endDate']
   this.carService.getAvailableCars(this.startDate, this.endDate).subscribe( data =>
    this.cars = data
   )
  }


  saveBooking(car : any) {

    let licensePlate = car['row'].licensePlate
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.bookingService
      .addBooking(licensePlate, user.id, this.startDate, this.endDate )
      .subscribe(() =>  car)
  }
}
