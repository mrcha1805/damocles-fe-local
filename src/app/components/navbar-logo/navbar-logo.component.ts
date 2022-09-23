import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-logo',
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.scss'],
})
export class NavbarLogoComponent implements OnInit {
  userName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.userName = 'Jessica K.';
  }

  logout() {
    console.log('logout');
  }
}
