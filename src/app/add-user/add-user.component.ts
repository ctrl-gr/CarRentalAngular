import { Component, OnInit } from '@angular/core';
import {User} from "../user/user-config";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  users: User[] = []
  userform!: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userform = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  addEditUser(userform: FormGroup) {
    //id?
  this.userService.addEditUser({
    id: 1,
    firstName: this.userform.value.firstName,
    lastName: this.userform.value.lastName,
    birthDate: this.userform.value.birthDate,
    username: this.userform.value.username,
    password: this.userform.value.password
  })
}

  onSubmit(form: FormGroup) {
    this.addEditUser(this.userform)
    console.log(this.userform)
  }
}
