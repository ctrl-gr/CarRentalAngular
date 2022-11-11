import { Component, OnInit } from '@angular/core';
import {MyAction, MyOrder, MyPagination, MySearch, MyTableActionEnum, MyTableConfig} from "../../components/my-table/my-table-config";
import {Booking} from "../../models/booking-config";
import {BookingService} from "../../services/booking.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  tableConfig !: MyTableConfig;
  order !: MyOrder;
  search !: MySearch;
  pagination !: MyPagination;
  actions !: MyAction[];
  bookings: Booking[] = [];
  data!: any[];
  isAdmin !: boolean; //get role from token


  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.pagination = {
      itemPerPage: 5,
      itemPerPageOptions: [5, 10, 15]
    }
    this.order = {
      defaultColumn: 'startDate',
      orderType: 'asc'
    }

    this.search = {
      columns: this.data
    }
    if (this.isAdmin) {
      this.actions = [
        {
          text: 'approva',
          cssClass: 'btn btn-warning',
          actionType: MyTableActionEnum.APPROVE,
          icon: 'offline_pin',
          onTop: false
        },
        {
          text: 'elimina',
          cssClass: 'btn btn-danger',
          actionType: MyTableActionEnum.DELETE,
          icon: 'remove',
          onTop: false
        },
        {
          text: 'nuova prenotazione',
          cssClass: 'btn btn-primary',
          actionType: MyTableActionEnum.NEW_ROW,
          icon: 'add',
          onTop: true
        }
      ]
    } else {
      this.actions = [

        {
          text: 'elimina',
          cssClass: 'btn btn-danger',
          actionType: MyTableActionEnum.DELETE,
          icon: 'remove',
          onTop: false
        }
    ]
    }

    this.tableConfig = {
      headers: [
        {
          key: 'startDate',
          label: 'data inizio',
        },
        {
          key: 'endDate',
          label: 'data fine',
        },
        {
          key: 'username',
          label: 'username',
        },
        {
          key: 'licensePlate',
          label: 'targa',
        },
        {
          key: 'approved',
          label: 'approvato',
        }
      ],
      order: this.order,
      search: this.search,
      pagination: this.pagination,
      actions: this.actions
    }

    this.data = [{
      bookings: this.getBookings()
    }
    ]

  }

  actionToPerform(myObject: any) {

    console.log(myObject)
    let action = myObject.action
    let booking = myObject.row

    switch (action) {
      case 'approve': {
        this.bookingService.addApproveBooking(booking)
        break;
      }
      case 'delete': {
        this.bookingService.deleteBooking(booking.id)
        break;
      }
      case 'new-row': {
        this.router.navigate(['newbooking'])//TODO
        break;
      }
    }
  }

  getBookings() {
    this.bookingService.getBookings().subscribe(data => {
      this.bookings = data;
    });
  }

}

