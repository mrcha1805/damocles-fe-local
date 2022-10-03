import { Component, OnInit } from '@angular/core';
import { UserProfile } from '@models/user-profile.model';

@Component({
  selector: 'app-navbar-logo',
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.scss'],
})
export class NavbarLogoComponent implements OnInit {
  userName: string = '';

  constructor() {}

  ngOnInit(): void {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userName = `${firstName} ${lastName?.charAt(0)}.`
    console.log(`user profile: ${userName}`);
    this.userName = userName;
  }

  logout() {
    console.log('logout');
  }
}
