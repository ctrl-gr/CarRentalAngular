import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-navbar',
  templateUrl: './my-navbar.component.html',
  styleUrls: ['./my-navbar.component.css']
})
export class MyNavbarComponent implements OnInit {

  @Input() isAdmin!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isAdmin = true
  }

}
