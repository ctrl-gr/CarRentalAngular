import {Component, OnInit} from '@angular/core';
import {MyButtonConfig} from "./my-button/my-button-config";
import {MyAction, MyOrder, MyPagination, MySearch, MyTableActionEnum, MyTableConfig} from "./my-table/my-table-config";
import {User} from "./user/user-config";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {}

}
