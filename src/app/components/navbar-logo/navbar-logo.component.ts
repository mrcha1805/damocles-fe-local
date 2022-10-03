import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-logo',
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.scss'],
})
export class NavbarLogoComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = 'Jessica K.';
  }
  navigateToHome() {
    this.router.navigateByUrl('/create-project');
  }

  logout() {
    console.log('logout');
  }
}
