import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '@models/user-profile.model';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-navbar-logo',
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.scss'],
})
export class NavbarLogoComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userName = `${firstName} ${lastName?.charAt(0)}.`;
    console.log(`user profile: ${userName}`);
    this.userName = userName;
  }
  navigateToHome() {
    this.router.navigateByUrl('/create-project');
  }

  logout() {
    console.log('logout');
    this.authService.logout();
  }
}
