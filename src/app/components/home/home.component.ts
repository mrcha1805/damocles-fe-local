import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  typeSelected: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinnerService: NgxSpinnerService
  ) {
    this.typeSelected = 'ball-atom';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.spinnerService.hide();
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('ngOnInit', JSON.stringify(params));
      this.spinnerService.show();
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
