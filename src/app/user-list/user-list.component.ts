import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user/user-config";
import {UserService} from "../services/user.service";
import {MyTableConfig} from "../my-table/my-table-config";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() table !: MyTableConfig;


  users: User[] = [];
  data = this.users

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    console.log(this.getUsers())
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
