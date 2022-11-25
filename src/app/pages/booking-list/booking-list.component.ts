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
import {ActivatedRoute, Router} from '@angular/router';
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
          key: 'startDateFormat',
          label: 'data inizio',
        },
        {
          key: 'endDateFormat',
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

  actionToPerform(myObject: any) {

    let action = myObject.action
    let booking = myObject.row

    switch (action) {
      case 'approve': {
        this.bookingService.approveBooking(booking)
        break;
      }
      case 'delete': {
        this.bookingService.deleteBooking(booking.id)
        break;
      }
      case 'new-row': {
        this.router.navigate(['newbooking'])
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
    const user = JSON.parse(localStorage.getItem('user') !)
    let username = user.username
    this.bookingService.getMyBookings(username).subscribe(data => {
      data.forEach(booking => {
        booking.startDateFormat = moment(booking.startDate).format('DD-MM-YYYY'),
          booking.endDateFormat = moment(booking.endDate).format('DD-MM-YYYY')
      })
      this.bookings = data;
    });
  }
}


