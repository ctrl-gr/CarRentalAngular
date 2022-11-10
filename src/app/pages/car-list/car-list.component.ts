import {Component, OnInit} from '@angular/core';
import {MyAction, MyOrder, MyPagination, MySearch, MyTableActionEnum, MyTableConfig} from "../../components/my-table/my-table-config";
import {Car} from "../../models/car-config";
import {CarService} from "../../services/car.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  tableConfig !: MyTableConfig;
  order !: MyOrder;
  search !: MySearch;
  pagination !: MyPagination;
  actions !: MyAction[];
  cars: Car[] = [];
  data!: any[];


  constructor(private carService: CarService,
              private router: Router) {
  }

  ngOnInit() {

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
        text: 'modifica',
        cssClass: 'btn btn-warning',
        actionType: MyTableActionEnum.EDIT,
        icon: 'edit',
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
        text: 'nuova auto',
        cssClass: 'btn btn-primary',
        actionType: MyTableActionEnum.NEW_ROW,
        icon: 'add',
        onTop: true
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

    this.data = [{
      cars: this.getCars()
    }
    ]

  }

  actionToPerform(myObject: any) {

    console.log(myObject)
    let action = myObject.action
    let car = myObject.row

    switch (action) {
      case 'edit': {
        this.carService.addEditCar(car)
        break;
      }
      case 'delete': {
        this.carService.deleteCar(car.id)
        break;
      }
      case 'new-row': {
        this.router.navigate(['newcar'])
        break;
      }
    }
  }

  getCars() {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
    });
  }

}

