import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsFunnel from 'highcharts/modules/funnel';

HighchartsMore(Highcharts);
HighchartsFunnel(Highcharts);

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { ClearallWorkspaceModalComponent } from 'app/modals/clearall-workspace-modal/clearall-workspace-modal.component';
import { SaveWorkspaceModalComponent } from 'app/modals/save-workspace-modal/save-workspace-modal.component';
import { ApiService } from 'app/services/api.service';
import {
  IProjectTemplate,
  Kpigroup,
} from 'app/model/project-template-interface';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements AfterViewInit, OnInit {
  isOpen: boolean = false;
  typeSelected: string;

  chart: any;
  chartData: any = [];
  integrateData: any = [];
  chartColor: any = [];

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

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private ngModalService: NgbModal,
    private apiService: ApiService
  ) {
    this.typeSelected = 'ball-atom';
  }

  ngAfterViewInit(): void {
    this.setOptionChartFunnel();
  }

  ngOnInit(): void {
    this.getProjectTemplateApi();
  }

  projectDataApi: IProjectTemplate | undefined;
  kpiGroup: Kpigroup[] | undefined;
  getProjectTemplateApi() {
    this.apiService.dynamicProjectTemplateMockup().subscribe((data: any) => {
      this.projectDataApi = data.body;
      console.log(this.projectDataApi);
      this.kpiGroup = this.projectDataApi?.resultData.kpi_group;
    });
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

  clearAll() {
    console.log('clear all');
    const modalRef = this.ngModalService.open(ClearallWorkspaceModalComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.result.then((result: any) => {
      if (result.search('clear all') != -1) {
        console.log('clear all');
        // TODO: update project lists
      }
    });
  }

  save() {
    console.log('save');
    const modalRef = this.ngModalService.open(SaveWorkspaceModalComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.result.then((result: any) => {
      if (result.search('save-success') != -1) {
        console.log('save success');
        // TODO: update project lists
      }
    });
  }
}
