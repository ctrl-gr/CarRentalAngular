import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MyTableConfig} from './my-table-config';
import * as _ from 'lodash';


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})

export class MyTableComponent implements OnInit {

  @Input() tableConfig!: MyTableConfig;
  @Input() data!: any;

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

  changePageOptions($event: any) {
    this.tableConfig.pagination.itemPerPage = +$event.target.value;
    this.pageIndex = 0;
    this.totalPages = Math.ceil(this.data.length / this.tableConfig.pagination.itemPerPage)
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


  @Output() inputActionToPerform = new EventEmitter<object>();

  actionToOutput(value: string, dataRow?: any) {

    let objectToEmit: {[key: string]: any} = {
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

