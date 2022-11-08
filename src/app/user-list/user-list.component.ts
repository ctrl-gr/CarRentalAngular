import { Component, OnInit } from '@angular/core';
import {User} from "../user/user-config";
import {UserService} from "../services/user.service";
import {MyAction, MyOrder, MyPagination, MySearch, MyTableConfig} from "../my-table/my-table-config";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
