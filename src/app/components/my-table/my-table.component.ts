import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyTableConfig} from './my-table-config';
import * as _ from 'lodash';
import {
  ArrowBackButton,
  ArrowDownButton,
  ArrowForwardButton,
  ArrowUpButton,
  MyButtonConfig
} from "../my-button/my-button-config";


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})

export class MyTableComponent implements OnInit, DoCheck {


  @Input() tableConfig!: MyTableConfig;
  @Input() data!: any;
  @Output() inputActionToPerform = new EventEmitter<object>();
  buttonConfigArrowUp: MyButtonConfig = ArrowUpButton
  buttonConfigArrowDown: MyButtonConfig = ArrowDownButton
  buttonConfigArrowBack: MyButtonConfig = ArrowBackButton
  buttonConfigArrowForward: MyButtonConfig = ArrowForwardButton
  searchTerm = '';
  selected = '';
  pageIndex: number = 0;
  totalPages: number = 0;


  constructor() {
  }


  ngOnInit() {

    this.data = _.orderBy(this.data, [this.tableConfig.order.defaultColumn])
    this.totalPages = Math.ceil(this.data.length / this.tableConfig.pagination.itemPerPage)

  }

  ngDoCheck() {

    this.data = _.orderBy(this.data, [this.tableConfig.order.defaultColumn])
    this.totalPages = Math.ceil(this.data.length / this.tableConfig.pagination.itemPerPage)

  }

  changePageOptions($event: any) {
    this.tableConfig.pagination.itemPerPage = +$event.target.value;
    console.log(this.data.length)
    this.totalPages = Math.ceil(this.data.length / this.tableConfig.pagination.itemPerPage)
    console.log('total pages starts from 0: ', this.totalPages)
  }


  pageNavigation(direction: string) {

    if (direction == 'previous') {
      if (this.pageIndex > 0) {
        this.pageIndex = this.pageIndex - 1
      }
    } else {
      if ((this.pageIndex + 1) < this.totalPages) {
        this.pageIndex = this.pageIndex + 1
      }
    }
  }


  actionToOutput(value: string, dataRow?: any) {

    let objectToEmit: { [key: string]: any } = { //TODO check this why?
      action: value,
      row: dataRow
    }
    this.inputActionToPerform.emit(objectToEmit);
  }


  setOrder(action: string, key: string) {
    this.tableConfig.order.orderType = action
    this.tableConfig.order.defaultColumn = key
    this.pageIndex = 0;
  }
}

