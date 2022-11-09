import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user/user-config";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  users: User[] = []
  userform!: FormGroup;

  constructor(
    private userService: UserService,
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.userform = new FormGroup({
      firstName: new FormControl(Validators.compose([Validators.required, Validators.min(3), Validators.max(20)])),
      lastName: new FormControl(Validators.compose([Validators.required, Validators.min(3), Validators.max(20)])),
      birthDate: new FormControl(Validators.compose([Validators.required])), // TODO implements correct date validator
      username: new FormControl(Validators.compose([Validators.required, Validators.min(3), Validators.max(12)])),
      password: new FormControl(Validators.compose([Validators.required, Validators.min(8), Validators.max(15)]))
    })
  }

  registerUser() {
    this.authService.signUp(this.userform.value).subscribe((res) => {
      if (res.result) {
        this.userform.reset();
        this.router.navigate(['login']);
      }
    });
  }
}

