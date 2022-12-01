import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {isString} from "lodash";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  isLoggedIn: boolean;
  isAdmin: boolean;
  registrationSuccess !: boolean

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.signinForm = this.fb.group({
      username: [''],
      password: [''],
    });
    this.isLoggedIn = this.authService.isLoggedIn
    this.isAdmin = this.authService.checkIsAdmin()
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && isString(params['registrationSuccess'])) {
        this.registrationSuccess = Boolean(JSON.parse(params['registrationSuccess']))
      }
    })
  }

    loginUser()
    {
      this.authService.signIn(this.signinForm.value);
      this.isLoggedIn = this.authService.isLoggedIn
      this.isAdmin = this.authService.checkIsAdmin()
    }

    signUp()
    {
      this.router.navigate(['newuser'])
    }
  }
