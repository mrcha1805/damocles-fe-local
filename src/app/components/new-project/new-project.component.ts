import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProject, IProjectModel } from 'src/app/model/project-interface';
import { DeleteProjectModalComponent } from 'src/app/modals/delete-project-modal/delete-project-modal.component';
import { ApiService } from 'src/app/services/api.service';

enum DaysNum {
  Today = 0,
  Week = 7,
  Month = 12,
  Year = 365,
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit, OnChanges {
  isOpen: boolean = false;
  typeSelected: string;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private spinnerService: NgxSpinnerService,
    private ngModalService: NgbModal,
    private apiService: ApiService
  ) {
    this.typeSelected = 'ball-atom';
  }
  IndustryENum = {
    all: 'all',
    insurance: 'Insurance',
    standard: 'Standard',
  };

  projectMasterData: IProject[] = [
    // {
    //   project_name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2021-11-24T00:14:39.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2021-08-24T00:14:39.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2021-09-25T00:14:39.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2022-09-17T00:14:39.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2022-09-18T00:14:39.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2022-09-25T07:10:50.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2022-09-24T00:14:39.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202108',
    //   description: 'Size of user who hav propensity to travel',
    //   created_at: '2021-08-18T04:40:31.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Saving Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202201',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2022-01-16T07:56:36.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Asset Protection',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202208',
    //   description: 'For 2+ 3+ Car owner',
    //   created_at: '2022-08-21T02:30:41.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Personal Accident Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Flexdrive 202209',
    //   description: 'Genral Travel Accident Insurance Propensity to Travel',
    //   created_at: '2022-09-21T02:30:41.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Travel Accident Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Easy Easy 2+ 3+ 202209',
    //   description: 'Size of user who hav propensity to travel',
    //   created_at: '2022-09-20T02:30:41.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Travel Accident Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'FlexiDrive ACS',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2022-09-03T02:30:41.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Asset Protection',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Travel Freemium 202209',
    //   description: 'Size of user who hav propensity to travel',
    //   created_at: '2022-09-15T02:30:41.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Travel Accident Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'Travel Freemium 202204',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created_at: '2022-04-06T07:32:36.000Z',
    //   industry_name: 'Insurance',
    //   product_name: 'Asset Protection',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   project_name: 'test',
    //   description: 'Size of user who hav propensity to travel',
    //   created_at: '2021-09-16T04:40:31.000Z',
    //   industry_name: 'Standard',
    //   product_name: 'Test1',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
  ];
  projectList: IProject[] = [];
  projectData: IProject[] = [];
  projectFilter: IProject[] = [];
  mode: any;
  search: string = '';

  productIsCollapsed: boolean = true;
  sortUpdated: boolean = true;
  industryFilterMode: any = 0;
  userProjectCount: number = 0;
  userRecentProjectCount: number = 0;
  filterMetadata = { data: [] };
  industryMode = [
    {
      name: 'All',
      value: 0,
    },
    {
      name: 'Insurance',
      value: 1,
    },
    {
      name: 'Standard',
      value: 2,
    },
  ];
  productList = [
    {
      name: 'Asset Protection',
      value: 10,
    },
    {
      name: 'Health Insurance',
      value: 11,
    },
    {
      name: 'Personal Accident Insurance',
      value: 12,
    },
    {
      name: 'Saving Insurance',
      value: 13,
    },
    {
      name: 'Travel Accident Insurance',
      value: 14,
    },
    {
      name: 'xxx Protection',
      value: 10,
    },
    {
      name: 'xxx Insurance',
      value: 11,
    },
    {
      name: 'xxx Accident Insurance',
      value: 12,
    },
  ];
  ngOnChanges(changes: SimpleChanges): void {
    this.updateSearchDataFilter(this.filterMetadata.data);
  }

  updateSearchDataFilter(data: any): void {
    this.industryFilterMode = 0;
    this.projectData = data;
    this.setData();
  }
  projectDataApi: IProjectModel | undefined;
  showPage: boolean = false;
  async ngOnInit(): Promise<void> {
    this.showPage = false;
    this.spinnerService.show();
    this.projectList = [];
    this.projectData = [];
    this.projectFilter = [];
    this.mode = this.IndustryENum.all;

    this.sortUpdated = true;
    this.industryFilterMode = 0;

    this.userProjectCount = 0;
    this.userRecentProjectCount = 10;

    this.getProjectApi();
  }
  getProjectApi() {
    this.apiService.getProjectAPI('1').subscribe(async (data) => {
      this.projectDataApi = data;
      if (this.projectDataApi.resultCode === '20000') {
        console.log(this.projectDataApi);
        this.projectMasterData = this.projectDataApi.resultData.project;
        this.projectData = this.projectMasterData;
        this.userProjectCount = this.projectMasterData.length;
        await this.setData();
      }
    });
  }

  async setData() {
    for (let i of this.projectData) {
      i.timeFormat = this.datePipe
        .transform(i.created_at, 'd MMM, hh:mm:ss')
        ?.toString();

      const currentDate = new Date();
      const createDate = new Date(i.created_at);

      const currentYear = currentDate.getFullYear();
      const createYear = createDate.getFullYear();
      const diffYear = currentYear - createYear;
      if (diffYear === 1) {
        const diffMonth = currentDate.getMonth() - createDate.getMonth();
        if (diffMonth <= 0) {
          i.timeLabel = this.datePipe
            .transform(i.created_at, 'dd MMM, hh:mm:ss')
            ?.toString();
        } else {
          i.timeLabel = this.datePipe
            .transform(i.created_at, 'dd MMM YYYY, hh:mm:ss')
            ?.toString();
        }
      } else if (diffYear > 0) {
        i.timeLabel = this.datePipe
          .transform(i.created_at, 'dd MMM YYYY, hh:mm:ss')
          ?.toString();
      } else {
        const diffTime = currentDate.getTime() - createDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays == DaysNum.Today) {
          i.timeLabel = `Today, ${this.datePipe
            .transform(i.created_at, 'hh:mm:ss')
            ?.toString()}`;
        } else if (diffDays <= DaysNum.Week) {
          i.timeLabel = `${diffDays} days ago, ${this.datePipe
            .transform(i.created_at, 'hh:mm:ss')
            ?.toString()}`;
        } else {
          const currentMonth = currentDate.getMonth();
          const createMonth = createDate.getMonth();
          const diffMonth = currentMonth - createMonth;
          if (diffMonth === 0) {
            i.timeLabel = this.datePipe
              .transform(i.created_at, 'dd EEE, hh:mm:ss')
              ?.toString();
          } else if (diffMonth < DaysNum.Month) {
            i.timeLabel = this.datePipe
              .transform(i.created_at, 'dd MMM, hh:mm:ss')
              ?.toString();
          }
        }
      }
    }
    console.log(this.projectData);
    this.projectList = this.projectFilter = this.projectData;
    this.sortUpdatedIconChange();
    this.showPage = true;
    this.spinnerService.hide();
  }

  filter(mode: any) {
    this.productIsCollapsed = true;
    this.projectList = this.projectData;
    this.mode = mode;
    if (mode !== this.IndustryENum.all) {
      let filterData = this.projectList.filter((e) => e.industry_name === mode);

      // console.log('mode: ' + mode);
      // console.log('filter: ' + JSON.stringify(filterData));
      this.projectList = filterData;
    }
    this.industryFilterMode = this.industryMode.find(
      (e) => e.name === mode
    )?.value;
    this.projectFilter = this.projectList;
  }
  filterProduct(f: string) {
    console.log('filterProduct: ' + f);
    const result: IProject[] = this.projectData.filter(
      (e) => e.product_name === f
    );
    this.projectList = result;
  }
  removeProject(p: IProject) {
    console.log(p.project_name);
    const dIndex = this.projectData.findIndex(
      (e) => e.project_name === p.project_name
    );

    console.log(dIndex);
    this.projectData.splice(dIndex, 1);
    this.filter(this.mode!);
  }
  showSpinner(path: string) {
    this.spinnerService.show();
    this.router.navigateByUrl(path);
    // setTimeout(() => {
    //   this.spinnerService.hide();
    //   this.router.navigateByUrl(path);
    // }, 1000);
  }

  goKpi() {
    this.showSpinner('/kpi');
  }
  deleteProject(p: IProject) {
    console.log('deleteProject');
    const modalRef = this.ngModalService.open(DeleteProjectModalComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.projectName = p.project_name;
    modalRef.result.then((result: any) => {
      if (result.search('deleting') != -1) {
        this.removeProject(p);
        // TODO: update project lists
      }
    });
  }

  sortUpdatedIconChange() {
    this.sortUpdated = !this.sortUpdated;
    if (this.filterMetadata.data.length > 0) {
      this.projectList =
        this.projectFilter =
        this.projectData =
          this.filterMetadata.data;
    } else {
      this.projectList = this.projectFilter = this.projectData;
    }
    if (this.sortUpdated) {
      this.projectList.sort((a, b) => {
        return a.created_at < b.created_at
          ? -1
          : a.created_at > b.created_at
          ? 1
          : 0;
      });
    } else {
      this.projectList.sort((a, b) => {
        return a.created_at > b.created_at
          ? -1
          : a.created_at > b.created_at
          ? 1
          : 0;
      });
    }
  }

  productIconChange() {
    this.productIsCollapsed = false;
  }
  productMenuClose() {
    this.productIsCollapsed = !this.productIsCollapsed;
  }
}
