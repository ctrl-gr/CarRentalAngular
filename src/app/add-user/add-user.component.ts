import { Component, OnInit } from '@angular/core';
import {User} from "../user/user-config";
import {UserService} from "../services/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  users: User[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    // create a method that takes data from form and add a user
    console.log(form)
  }
}
