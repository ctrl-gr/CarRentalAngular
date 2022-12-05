import {Component, OnInit} from '@angular/core';
import {
  MyAction,
  MyOrder,
  MyPagination,
  MySearch,
  MyTableActionEnum,
  MyTableConfig
} from "../../components/my-table/my-table-config";
import {Booking} from "../../models/booking-config";
import {BookingService} from "../../services/booking.service";
import {Router} from '@angular/router';
import * as moment from "moment/moment";
import {AuthService} from "../../auth/auth.service";

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
  isAdmin !: boolean;
  alert !: boolean
  message !: string
  bookingDeleted !: boolean


  constructor(
    private bookingService: BookingService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isAdmin = this.authService.checkIsAdmin()

    if (!this.isAdmin) {
      this.getMyBookings()

    } else {
      this.getBookings()

    }

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
    if (!this.isAdmin) {
      this.tableConfig = {
        headers: [
          {
            key: 'startDateFormat',
            label: 'data inizio',
          },
          {
            key: 'endDateFormat',
            label: 'data fine',
          },
          {
            key: 'manufacturerModel',
            label: 'auto',
          },
          {
            key: 'isApproved',
            label: 'approvato',
          },
          {
            key: 'actions',
            label: 'azioni'
          }
        ],
        order: this.order,
        search: this.search,
        pagination: this.pagination,
        actions: this.actions
      }
    } else {
      this.tableConfig = {
        headers: [
          {
            key: 'startDateFormat',
            label: 'data inizio',
          },
          {
            key: 'endDateFormat',
            label: 'data fine',
          },
          {
            key: 'licensePlate',
            label: 'targa',
          },
          {
            key: 'username',
            label: 'username'
          },
          {
            key: 'isApproved',
            label: 'approvato',
          },
          {
            key: 'actions',
            label: 'azioni'
          }
        ],
        order: this.order,
        search: this.search,
        pagination: this.pagination,
        actions: this.actions
      }
    }
  }

  actionToPerform(myObject: any) {

    let action = myObject.action
    let booking = myObject.row

    switch (action) {
      case 'approve': {
        this.approveBooking(booking)
        break;
      }
      case 'delete': {
        this.deleteBooking(booking)
        break;
      }
    }
  }

  getBookings() {
    this.bookingService.getBookings().subscribe(data => {
      data.forEach(booking => {
        booking.startDateFormat = moment(booking.startDate).format('DD-MM-YYYY'),
          booking.endDateFormat = moment(booking.endDate).format('DD-MM-YYYY')
      })
      this.bookings = data;
    });
  }

  getMyBookings() {
    const user = localStorage.getItem('user') !
    let username = user
    this.bookingService.getMyBookings(username).subscribe(data => {
      data.forEach(booking => {
        booking.startDateFormat = moment(booking.startDate).format('DD-MM-YYYY'),
          booking.endDateFormat = moment(booking.endDate).format('DD-MM-YYYY')
      })
      this.bookings = data;
    });
  }

  deleteBooking(booking: Booking) {
    this.bookingService.deleteBooking(booking).subscribe(() => {
      this.getBookings()
    })
    this.alert = true
    this.bookingDeleted = true
    this.message = "Booking deleted successfully."
  }

  approveBooking(booking: Booking) {
    this.bookingService
      .approveBooking(booking)
      .subscribe(() => booking)
    this.getBookings()
    this.alert = true
    this.message = "Booking approved successfully."
  }

  closeAlert() {
    this.alert = false
    this.router.navigate(['bookings'])
  }
}


