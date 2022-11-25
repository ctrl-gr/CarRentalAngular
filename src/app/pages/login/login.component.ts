import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  isLoggedIn : boolean;
  isAdmin : boolean;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      username: [''],
      password: [''],
    });
    this.isLoggedIn = this.authService.isLoggedIn
    this.isAdmin = this.authService.checkIsAdmin()
  }

  ngOnInit() {

  }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
    this.isLoggedIn = this.authService.isLoggedIn
    this.isAdmin = this.authService.checkIsAdmin()
  }

  signUp() {
    this.router.navigate(['newuser'])
  }
}
