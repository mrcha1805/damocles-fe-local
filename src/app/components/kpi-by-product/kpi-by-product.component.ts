import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { end } from '@popperjs/core';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-kpi-by-product',
  templateUrl: './kpi-by-product.component.html',
  styleUrls: ['./kpi-by-product.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0s')]),
      transition('closed => open', [animate('1s')]),
    ]),
  ],
})
export class KpiByProductComponent implements OnInit {
  kpiList: any = [
    // {
    //   name: 'Standard',
    //   image: './assets/icons/standard-icon.svg',
    //   desc: 'Standard Industrial Domain Insight',
    //   info: 'xxxxx',
    //   isSelected: false,
    //   data: [
    //     { value: 'Deposit', info: 'xxxxx', isSelected: false },
    //     { value: 'Credit', info: 'xxxxx', isSelected: false },
    //     { value: 'Investment', info: 'xxxxx', isSelected: false },
    //   ],
    // },
    {
      name: 'Standard',
      image: './assets/icons/insurance-icon.svg',
      desc: 'You can customize KPIs for your project',
      info: 'xxxxx',
      isSelected: false,
      data: [
        {
          value: 'Asset Protection',
          info: 'Finding target for asset protection such as motor insurance, house insurance and gadget insurance',
          isSelected: false,
        },
        {
          value: 'Health Insurance',
          info: 'Finding target for health insurance',
          isSelected: false,
        },
        {
          value: 'Personal Accident Insurance',
          info: 'Finding target for personal accident insurance',
          isSelected: false,
        },
        {
          value: 'Saving Insurance',
          info: 'Finding target for saving insurance',
          isSelected: false,
        },
        {
          value: 'Travel Accident Insurance',
          info: 'Finding target for travel accident insurance',
          isSelected: false,
        },
      ],
    },
    {
      name: 'Insurance',
      image: './assets/icons/insurance-icon.svg',
      desc: 'Insurance Industrial Domain Insight',
      info: 'xxxxx',
      isSelected: false,
      data: [
        {
          value: 'Asset Protection',
          info: 'Finding target for asset protection such as motor insurance, house insurance and gadget insurance',
          isSelected: false,
        },
        {
          value: 'Health Insurance',
          info: 'Finding target for health insurance',
          isSelected: false,
        },
        {
          value: 'Personal Accident Insurance',
          info: 'Finding target for personal accident insurance',
          isSelected: false,
        },
        {
          value: 'Saving Insurance',
          info: 'Finding target for saving insurance',
          isSelected: false,
        },
        {
          value: 'Travel Accident Insurance',
          info: 'Finding target for travel accident insurance',
          isSelected: false,
        },
      ],
    },
  ];

  triggers = NgxPopperjsTriggers;
  placements = NgxPopperjsPlacements;
  offsetModifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 2],
      },
    },
    {
      name: 'flip',
      options: {
        flipVariations: true,
      },
    },
  ];

  isCollapsed = -1;
  style: object = {};
  helpMenuOpen: string = 'closed';
  tempIndex: number = 0;

  typeSelected: string;

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {
    this.typeSelected = 'ball-atom';
  }

  ngOnInit() {}

  collapsed(index: number) {
    // if (index === 0) {
    //   return;
    // } else {
    //   if (this.isCollapsed === index) {
    //     this.isCollapsed = -1;
    //     this.kpiList.forEach((e: any) => {
    //       e.isSelected = false;
    //     });
    //   } else {
    //     this.isCollapsed = index;
    //     this.kpiList.forEach((e: any) => {
    //       e.isSelected = true;
    //     });
    //   }
    // }
    if (this.isCollapsed === index) {
      this.isCollapsed = -1;
      this.kpiList.forEach((e: any) => {
        e.isSelected = false;
      });
    } else {
      this.isCollapsed = index;
      this.kpiList.forEach((e: any) => {
        e.isSelected = true;
      });
    }
  }

  setBorderCollapsed(index: number) {
    this.kpiList.forEach((e: any, i: number) => {
      if (i === index) {
        var value = e.data.every((element: any) => {
          return element.isSelected === false;
        });
        if (value === false) {
          this.style = {
            border: '2px solid #491DC5',
            // boxShadow: '5px 5px 20px rgba(73, 29, 197, 0.2)',
          };
        } else if (this.isCollapsed === index) {
          this.style = {
            border: '2px solid #491DC5',
            // boxShadow: '5px 5px 20px rgba(73, 29, 197, 0.2)',
          };
        } else {
          this.style = {
            border: '0.8px solid #9A9A9A',
            margin: '1.2px',
          };
        }
      }
    });
    return this.style;
  }

  setIconSelected(index: number) {
    this.kpiList.forEach((e: any, i: number) => {
      if (i === index) {
        var value = e.data.every((element: any) => {
          return element.isSelected === false;
        });

        if (value === false) {
          this.style = {
            display: '',
          };
        } else {
          this.style = {
            display: 'none',
          };
        }
      }
    });
    return this.style;
  }

  toggleHelpMenu() {
    this.helpMenuOpen = 'closed';
    setTimeout(() => {
      this.helpMenuOpen = 'open';
    }, 100);
  }

  changeSelected(index: number, target: number) {
    setTimeout(() => {
      this.kpiList.forEach((e: any, i: number) => {
        // e.data.forEach((item: any, j: number) => {
        //   item.isSelected = j === target ? true : false;
        // });
        var value = e.data.every((element: any) => {
          return element.isSelected === false;
        });
        e.data.forEach((item: any, j: number) => {
          if (i === index) {
            if (value === false) {
              item.isSelected = j === target ? true : false;
            } else {
              item.isSelected = false;
            }
          } else {
            if (value === true) {
              item.isSelected = j === target ? false : false;
            } else {
              item.isSelected = false;
            }
          }
        });
      });
      console.log(this.kpiList);
    }, 100);
  }

  showSpinner(path: string) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.router.navigateByUrl(path);
    }, 1000);
  }

  goCreateProject() {
    this.showSpinner('/create-project');
  }

  goCreateKpi() {
    this.showSpinner('/create-kpi');
  }

  setStyleCollapsed(index: number) {
    var style = {};
    if (this.isCollapsed !== index) {
      style = {
        display: 'none',
      };
    } else {
      style = {
        display: 'unset',
      };
    }
    return style;
  }
}
