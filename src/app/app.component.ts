import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {ActivatedRoute} from "@angular/router";
import {isString} from "lodash";
import {MyButtonConfig, SuccessButton} from "./components/my-button/my-button-config";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn !: boolean
  buttonConfig : MyButtonConfig = SuccessButton


  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
    if (params && isString(params['isLogged'])) {
      this.isLoggedIn = Boolean(JSON.parse(params['isLogged']))
    }

  })

    this.isLoggedIn = this.authService.isLoggedIn
    console.log(this.isLoggedIn)


  }


}

