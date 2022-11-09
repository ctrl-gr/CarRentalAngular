import { Component, OnInit } from '@angular/core';
import { User } from './user-config';
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = []

  constructor(private userService: UserService) { }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe((users: User[]) => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
