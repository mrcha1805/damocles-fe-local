import { Component, Input, OnInit } from '@angular/core';
import { Featuregroup } from 'app/model/project-template-interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor() {}
  // menu = [
  //   {
  //     headerMenu: 'Audience Profile',
  //     no: 0,
  //     subMenu: [
  //       {
  //         name: 'Demographic',
  //         fileType: 'filter',
  //       },
  //       {
  //         name: 'Geographics0',
  //         fileType: 'filter',
  //       },
  //     ],
  //   },
  //   {
  //     headerMenu: 'Product Related',
  //     no: 1,
  //     subMenu: [
  //       {
  //         name: 'Demographic1',
  //         fileType: 'filter',
  //       },
  //       {
  //         name: 'Geographics1',
  //         fileType: 'filter',
  //       },
  //     ],
  //   },
  //   {
  //     headerMenu: 'Propensity to buy',
  //     no: 2,
  //     subMenu: [
  //       {
  //         name: 'Demographic2',
  //         fileType: 'filter',
  //       },
  //       {
  //         name: 'Geographics2',
  //         fileType: 'filter',
  //       },
  //     ],
  //   },
  // ];

  // menu = [
  //   {
  //     headerMenu: 'Customer Profile',
  //     no: 0,
  //     fileType: 'filter'
  //   },
  //   {
  //     headerMenu: 'Product Related',
  //     no: 1,
  //     fileType: 'slider'
  //   },
  //   {
  //     headerMenu: 'Propensity ',
  //     no: 2,
  //      fileType: 'slider'
  //   },
  // ];
  menuIndex: string = '1';
  @Input() menu: Featuregroup[] | undefined;

  ngOnInit(): void {
    this.menuIndex = '1';
  }
  setSelection(index: string) {
    this.menuIndex = index;
  }
}
