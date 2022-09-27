import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';

@Component({
  selector: 'app-funnel-chart',
  templateUrl: './funnel-chart.component.html',
  styleUrls: ['./funnel-chart.component.scss']
})
export class FunnelChartComponent implements OnInit {

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

  funnelList: any = [
    {
      name: 'Age',
      value: '40,000,000',
      color: '#EDE8F9',
      width:  '219'
    },
    {
      name: 'Gender',
      value: '9,000,000',
      color: '#DBD2F3',
      width:  '210'
    },
    {
      name: 'Nationality',
      value: '8,900,000',
      color: '#C8BBED',
      width:  '200'
    },
    {
      name: 'Home Location',
      value: '8,500,000',
      color: '#B6A5E8',
      width:  '190'
    },
    {
      name: 'Occupation',
      value: '8,000,000',
      color: '#A48EE2',
      width:  '180'
    },
    {
      name: 'Work Location',
      value: '6,800,000',
      color: '#9278DC',
      width:  '170'
    },
    {
      name: 'Life Status',
      value: '4,900,000',
      color: '#7F61D6',
      width:  '160'
    },
    {
      name: 'Net Worth',
      value: '400,000',
      color: '#6D4AD0',
      width:  '150'
    },
    {
      name: 'Digital Spending Score',
      value: '5,000,000',
      color: '#5B34CA',
      width:  '86'
    },
    {
      name: 'Propensity to find a job',
      value: '500,000',
      color: '#491DC5',
      width:  '79'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.funnelList, event.previousIndex, event.currentIndex);
  }

  cardChartColor() {
    console.log('test')
  }

}
