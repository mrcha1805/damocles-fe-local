import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsFunnel from 'highcharts/modules/funnel';

HighchartsMore(Highcharts);
HighchartsFunnel(Highcharts);

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-kpi',
  templateUrl: './create-kpi.component.html',
  styleUrls: ['./create-kpi.component.scss'],
})
export class CreateKpiComponent implements AfterViewInit, OnInit {
  isOpen: boolean = false;
  typeSelected: string;

  chart: any;
  chartData: any = [];
  integrateData: any = [];
  chartColor: any = [];

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {
    this.typeSelected = 'ball-atom';
  }

  ngAfterViewInit(): void {
    this.setOptionChartFunnel();
  }

  ngOnInit(): void {
    this.integrateData = [
      {
        customer: 'Demographics',
        summary: 3000000,
        component: [
          { key: 'Age', value: 10000000 },
          { key: 'Gender', value: 20000000 },
          { key: 'AJobs Type', value: 5000000 },
        ],
      },
      {
        customer: 'Afflucency',
        summary: 2040780,
        component: [
          { key: 'item 1', value: 10000000 },
          { key: 'item 2', value: 20000000 },
          { key: 'item 3', value: 5000000 },
        ],
      },
      {
        customer: 'Digital score',
        summary: 1640780,
        component: [
          { key: 'item 1', value: 10000000 },
          { key: 'item 2', value: 20000000 },
          { key: 'item 3', value: 5000000 },
        ],
      },
      {
        customer: 'Influencer score ​',
        summary: 1240780,
        component: [
          { key: 'item 1', value: 10000000 },
          { key: 'item 2', value: 20000000 },
          { key: 'item 3', value: 5000000 },
        ],
      },
      {
        customer: 'Behavior',
        summary: 1040780,
        component: [
          { key: 'item 1', value: 10000000 },
          { key: 'item 2', value: 20000000 },
          { key: 'item 3', value: 5000000 },
        ],
      },
      {
        customer: 'Interest',
        summary: 9407808,
        component: [
          { key: 'item 1', value: 10000000 },
          { key: 'item 2', value: 20000000 },
          { key: 'item 3', value: 5000000 },
        ],
      },
      {
        customer: 'Support family',
        summary: 70543,
        component: [
          { key: 'item 1', value: 10000000 },
          { key: 'item 2', value: 20000000 },
          { key: 'item 3', value: 5000000 },
        ],
      },
    ];
    this.integrateData = _.orderBy(this.integrateData, ['summary'], ['desc']);
    this.integrateData.forEach((element: any) => {
      this.chartData.push([element.customer, element.summary]);
    });
    this.setColorChart();
  }

  setColorChart() {
    var red: number = 237;
    var blue: number = 232;
    var green: number = 249;
    for (var i = 0; i <= this.chartData.length; i++) {
      if (i == 0) {
        this.chartColor.push(`rgba(${red}, ${blue}, ${green}, 1)`);
      } else {
        this.chartColor.push(
          `rgba(${(red -= 18)}, ${(blue -= 22)}, ${(green -= 6)}, 1)`
        );
      }
    }
  }

  setOptionChartFunnel() {
    this.chart = Highcharts.chart('chart-funnel', {
      accessibility: {
        enabled: false,
      },
      chart: {
        type: 'funnel',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        height: 'auto',
      },
      colors: this.chartColor,
      credits: {
        enabled: false,
      },
      title: {
        text: null,
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            color: Highcharts.theme || 'black',
          },
          height: '100%',
          minSize: 80,
          center: ['50%', '50%'],
          neckWidth: '33%',
          neckHeight: 0,
          width: '67%',
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 5,
          states: {
            hover: {
              brightness: 0.1,
              enabled: true,
            },
          },
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: 'Count: ',
          data: this.chartData,
          enableMouseTracking: true,
        },
      ],
      tooltip: {
        enabled: false,
      },
    } as any);
  }

  showSpinner(path: string) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.router.navigateByUrl(path);
    }, 1000);
  }

  goKpi() {
    this.showSpinner('/kpi');
  }
}
