import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {ActivatedRoute} from "@angular/router";
import {isString} from "lodash";
import {AuthGuardService} from "./auth/auth.guard.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn : boolean = false

  constructor(private authService : AuthService, private activatedRoute : ActivatedRoute) {

  }

  ngOnInit() {
  this.activatedRoute.queryParams.subscribe(params => {
    if (params && isString(params['isLogged'])) {
      this.isLoggedIn = Boolean(JSON.parse(params['isLogged']))
    }

  })
  }



}

