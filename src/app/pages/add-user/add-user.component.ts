import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user-config";
import {UserService} from "../../services/user.service";
import {isString} from "lodash";
import {MyButtonConfig} from "../../components/my-button/my-button-config";
import {MyTableActionEnum} from "../../components/my-table/my-table-config";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  signupForm: FormGroup;
  isAdmin !: boolean
  userToEdit !: string
  isEditMode !: boolean
  user !: User
  userEdited !: boolean
  buttonConfig !: MyButtonConfig


  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.signupForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.checkIsAdmin()

    this.activatedRoute.queryParams.subscribe(params => {
      if (params && isString(params['usertoedit'])) {
        this.userToEdit = params['usertoedit']
        this.isEditMode = true
        this.getUserToEdit(this.userToEdit)
      }
    })

    if (!this.isEditMode)
      this.buttonConfig = {
        customCssClass: 'btn btn-primary',
        text: 'Sign up',
        isDisabled: !this.signupForm.valid
      };
    else {
      this.buttonConfig = {
        customCssClass: 'btn btn-primary',
        text: 'Update',
        isDisabled: !this.signupForm.valid
      }
    }
  }

  registerUser() {
    if (!this.isAdmin) {
      this.authService.signUp(this.signupForm.value).subscribe(
        data => {
          this.router.navigate(['login'], {queryParams: {registrationSuccess: true}})
        }
      )
    } else {
      console.log(this.signupForm.value)
      this.authService.signUp(this.signupForm.value).subscribe(
        data => {
          this.router.navigate(['newuser'], {queryParams: {registrationSuccess: true}})
        }
      )
    }

  }

  getUserToEdit(username: string) {
    username = this.userToEdit
    this.userService.getUserByUsername(username).subscribe(user => {
      this.signupForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDateFormat,
        username: user.username,
        password: user.password
      })
    })

  }

  editUser() {
    this.user = this.signupForm.value
    this.userService
      .editUser(this.user, this.userToEdit)
      .subscribe(() => this.user)
    this.userEdited = true
  }
}

//TODO 1. unsubscribe 3.fix auth guard
