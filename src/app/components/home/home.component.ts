import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('ngOnInit', JSON.stringify(params));
      if (params.code !== undefined) {
        console.log('send request access token');
        this.authService.tryLogin();
      } else {
        console.log('login to ADMD');
        this.authService.login();
      }
    });
  }
}
