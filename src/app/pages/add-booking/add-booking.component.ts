import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Booking} from "../../models/booking-config";
import {BookingService} from "../../services/booking.service";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  bookings: Booking[] = []
  bookingform!: FormGroup;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingform = new FormGroup({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      licensePlate: new FormControl(null, Validators.required)
    })
  }

  addApproveBooking(bookingform: FormGroup) {
    //id?
    this.bookingService.addApproveBooking({
      id: 1,
      startDate: this.bookingform.value.startDate,
      endDate: this.bookingform.value.endDate,
      username: this.bookingform.value.username,
      licensePlate: this.bookingform.value.licensePlate,
      approved: false

    })
  }

  onSubmit(form: FormGroup) {
    this.addApproveBooking(this.bookingform)
    console.log(this.bookingform)
  }
}
