import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-my-navbar',
  templateUrl: './my-navbar.component.html',
  styleUrls: ['./my-navbar.component.css']
})
export class MyNavbarComponent implements OnInit {

  @Input() isAdmin!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = true
  }

  logout() {
    this.authService.doLogout()
  }
}
