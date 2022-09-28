import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';

export interface Ifunnel {
  product: string;
  measure: string;
}

@Component({
  selector: 'app-funnel-chart',
  templateUrl: './funnel-chart.component.html',
  styleUrls: ['./funnel-chart.component.scss']
})
export class FunnelChartComponent implements OnInit {

  style: object = {};

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

  funnelList: Ifunnel[] = [
    {
      product: 'Age',
      measure: '40,000,000',
    },
    {
      product: 'Gender',
      measure: '9,000,000',
    },
    {
      product: 'Nationality',
      measure: '8,900,000',
    },
    {
      product: 'Home Location',
      measure: '8,500,000',
    },
    {
      product: 'Occupation',
      measure: '8,000,000',
    },
    {
      product: 'Work Location',
      measure: '6,800,000',
    },
    {
      product: 'Life Status',
      measure: '4,900,000',
    },
    {
      product: 'Net Worth',
      measure: '400,000',
    },
    {
      product: 'Digital Spending Score',
      measure: '5,000,000',
    },
    {
      product: 'Propensity to find a job',
      measure: '500,000',
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

  setStyleChart(fn: Ifunnel) {
    var widthChart = parseFloat(fn.measure) / 2;
    var heightChart = (360 / this.funnelList.length);

    this.style = {
      width: widthChart.toString() + 'px',
      height: heightChart.toString() + 'px',
    };

    console.log(this.style);
    return this.style;
  }

}
