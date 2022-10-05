import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { IfunnelList } from 'app/model/cube-interface';

export interface Ifunnel {
  feature: string;
  sum: string;
}

@Component({
  selector: 'app-funnel-chart',
  templateUrl: './funnel-chart.component.html',
  styleUrls: ['./funnel-chart.component.scss'],
})
export class FunnelChartComponent implements OnInit {
  @Input() funnelList: IfunnelList[] | undefined;
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

  funnelListMockup: Ifunnel[] = [
    {
      feature: 'Age',
      sum: '40,000,000',
    },
    {
      feature: 'Gender',
      sum: '20,000,000',
    },
    {
      feature: 'Nationality',
      sum: '19,900,000',
    },
    {
      feature: 'Home Location',
      sum: '17,500,000',
    },
    {
      feature: 'Occupation',
      sum: '16,300,000',
    },
    {
      feature: 'Work Location',
      sum: '15,800,000',
    },
    {
      feature: 'Life Status',
      sum: '7,900,000',
    },
    {
      feature: 'Net Worth',
      sum: '5,400,000',
    },
    {
      feature: 'Digital Spending Score',
      sum: '2,200,000',
    },
    {
      feature: 'Propensity to find a job',
      sum: '500,000',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    //   this.funnelList?.sort((a, b) => {
    //     return a.sum - b.sum;
    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.funnelList!, event.previousIndex, event.currentIndex);
  }

  setStyleChart(fn: IfunnelList) {
    const heightChart = 360 / this.funnelList!.length;
    const position: number = this.funnelList!.findIndex(
      (x) => x.feature === fn.feature
    );

    let firstChart: number = 0;
    let calFirstChart: number = 0;
    let chart: number = 0;

    if (position === 0) {
      // firstChart = parseFloat(
      //   this.funnelList![position].sum.replace(/,/g, '')
      // );
      firstChart = this.funnelList![position].sum;
      calFirstChart = (firstChart / firstChart) * 400;

      this.style = {
        width: calFirstChart + 'px',
        height: heightChart.toString() + 'px',
      };
    } else if (position > 0) {
      // firstChart = parseFloat(
      //   this.funnelList![position].sum.replace(/,/g, '')
      // );
      firstChart = this.funnelList![position].sum;
      // chart = parseFloat(this.funnelList[position-1].sum.replace(/,/g, ''));
      // chart = parseFloat(this.funnelList![0].sum.replace(/,/g, ''));
      chart = this.funnelList![0].sum;
      const finalWidth = (firstChart / chart) * 400;

      this.style = {
        width: finalWidth + 'px',
        height: heightChart.toString() + 'px',
      };
    }
    return this.style;
  }

  percentage(count: number, total: number) {
    let per = ((count * 100) / total).toFixed(2);
    return `count : ${this.addCommaIntoNumber(count)} (${per}%)`;
  }

  addCommaIntoNumber(number: number) {
    return number.toLocaleString();
  }

  // checkItem(item:number) {
  //   if (Number.isInteger(item)) {
  //     return item.toFixed(2);
  //   }
  //   return item;
  // }
}
