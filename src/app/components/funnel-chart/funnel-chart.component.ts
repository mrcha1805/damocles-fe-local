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
      measure: '20,000,000',
    },
    {
      product: 'Nationality',
      measure: '19,900,000',
    },
    {
      product: 'Home Location',
      measure: '17,500,000',
    },
    {
      product: 'Occupation',
      measure: '16,300,000',
    },
    {
      product: 'Work Location',
      measure: '15,800,000',
    },
    {
      product: 'Life Status',
      measure: '7,900,000',
    },
    {
      product: 'Net Worth',
      measure: '5,400,000',
    },
    {
      product: 'Digital Spending Score',
      measure: '2,200,000',
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
    const heightChart = (360 / this.funnelList.length);
    const position: number = this.funnelList.findIndex(x => x.product === fn.product);
    
    let firstChart: number = 0;
    let calFirstChart: number = 0;
    let chart: number = 0;

    if (position === 0) {
      firstChart = parseFloat(this.funnelList[position].measure.replace(/,/g, ''));
      calFirstChart = ( firstChart / firstChart) * 400
      
      this.style = {
        width: calFirstChart + 'px',
        height: heightChart.toString() + 'px',
      };

    } else if (position > 0) {
      firstChart = parseFloat(this.funnelList[position].measure.replace(/,/g, ''));
      // chart = parseFloat(this.funnelList[position-1].measure.replace(/,/g, ''));
      chart = parseFloat(this.funnelList[0].measure.replace(/,/g, ''));
      const finalWidth = ( firstChart / chart) * 400
  
      this.style = {
        width: finalWidth + 'px',
        height: heightChart.toString() + 'px',
      };
    }
    return this.style;
  }

}
