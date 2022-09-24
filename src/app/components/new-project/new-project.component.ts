import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProject } from 'src/app/model/project-interface';
import { DeleteProjectModalComponent } from 'src/app/modals/delete-project-modal/delete-project-modal.component';

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
    private ngModalService: NgbModal
  ) {
    this.typeSelected = 'ball-atom';
  }

  projectMasterData: IProject[] = [
    // {
    //   name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created: '2021-11-24T00:14:39.000Z',
    //   industry: 'Insurance',
    //   product: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created: '2021-08-24T00:14:39.000Z',
    //   industry: 'Insurance',
    //   product: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created: '2021-09-25T00:14:39.000Z',
    //   industry: 'Insurance',
    //   product: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created: '2022-09-17T00:14:39.000Z',
    //   industry: 'Insurance',
    //   product: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created: '2022-09-18T00:14:39.000Z',
    //   industry: 'Insurance',
    //   product: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created: '2022-09-25T07:10:50.000Z',
    //   industry: 'Insurance',
    //   product: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },
    // {
    //   name: 'Flexdrive 202101',
    //   description: '4 Persona : Somjad , BiBi, Jennie, Tik',
    //   created: '2022-09-24T00:14:39.000Z',
    //   industry: 'Insurance',
    //   product: 'Health Insurance',
    //   timeFormat: '',
    //   timeLabel: '',
    // },

    {
      name: 'Flexdrive 202108',
      description: 'Size of user who hav propensity to travel',
      created: '2021-08-18T04:40:31.000Z',
      industry: 'Insurance',
      product: 'Saving Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Flexdrive 202201',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-01-16T07:56:36.000Z',
      industry: 'Insurance',
      product: 'Asset Protection',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Flexdrive 202208',
      description: 'For 2+ 3+ Car owner',
      created: '2022-08-21T02:30:41.000Z',
      industry: 'Insurance',
      product: 'Personal Accident Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Flexdrive 202209',
      description: 'Genral Travel Accident Insurance Propensity to Travel',
      created: '2022-09-21T02:30:41.000Z',
      industry: 'Insurance',
      product: 'Travel Accident Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Easy Easy 2+ 3+ 202209',
      description: 'Size of user who hav propensity to travel',
      created: '2022-09-20T02:30:41.000Z',
      industry: 'Insurance',
      product: 'Travel Accident Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'FlexiDrive ACS',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-09-03T02:30:41.000Z',
      industry: 'Insurance',
      product: 'Asset Protection',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Travel Freemium 202209',
      description: 'Size of user who hav propensity to travel',
      created: '2022-09-15T02:30:41.000Z',
      industry: 'Insurance',
      product: 'Travel Accident Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Travel Freemium 202204',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-04-06T07:32:36.000Z',
      industry: 'Insurance',
      product: 'Asset Protection',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'test',
      description: 'Size of user who hav propensity to travel',
      created: '2021-09-16T04:40:31.000Z',
      industry: 'Standard',
      product: 'Test1',
      timeFormat: '',
      timeLabel: '',
    },
  ];
  projectList: IProject[] = [];
  projectData: IProject[] = [];
  projectFilter: IProject[] = [];
  mode: string | undefined;
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

  async ngOnInit(): Promise<void> {
    this.projectList = [];
    this.projectData = [];
    this.projectFilter = [];
    this.mode = 'all';

    this.sortUpdated = true;
    this.industryFilterMode = 0;

    this.userProjectCount = 0;
    this.userRecentProjectCount = 10;
    this.userProjectCount = this.projectMasterData.length;

    this.projectData = this.projectMasterData;
    await this.setData();
  }
  async setData() {
    for (let i of this.projectData) {
      i.timeFormat = this.datePipe
        .transform(i.created, 'd MMM, hh:mm:ss')
        ?.toString();

      const currentDate = new Date();
      const createDate = new Date(i.created);

      const currentYear = currentDate.getFullYear();
      const createYear = createDate.getFullYear();
      const diffYear = currentYear - createYear;
      if (diffYear === 1) {
        const diffMonth = currentDate.getMonth() - createDate.getMonth();
        if (diffMonth <= 0) {
          i.timeLabel = this.datePipe
            .transform(i.created, 'dd MMM, hh:mm:ss')
            ?.toString();
        } else {
          i.timeLabel = this.datePipe
            .transform(i.created, 'dd MMM YYYY, hh:mm:ss')
            ?.toString();
        }
      } else if (diffYear > 0) {
        i.timeLabel = this.datePipe
          .transform(i.created, 'dd MMM YYYY, hh:mm:ss')
          ?.toString();
      } else {
        const diffTime = currentDate.getTime() - createDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays == DaysNum.Today) {
          i.timeLabel = `Today, ${this.datePipe
            .transform(i.created, 'hh:mm:ss')
            ?.toString()}`;
        } else if (diffDays <= DaysNum.Week) {
          i.timeLabel = `${diffDays} days ago, ${this.datePipe
            .transform(i.created, 'hh:mm:ss')
            ?.toString()}`;
        } else {
          const currentMonth = currentDate.getMonth();
          const createMonth = createDate.getMonth();
          const diffMonth = currentMonth - createMonth;
          if (diffMonth === 0) {
            i.timeLabel = this.datePipe
              .transform(i.created, 'dd EEE, hh:mm:ss')
              ?.toString();
          } else if (diffMonth < DaysNum.Month) {
            i.timeLabel = this.datePipe
              .transform(i.created, 'dd MMM, hh:mm:ss')
              ?.toString();
          }
        }
      }
    }
    console.log(this.projectData);
    this.projectList = this.projectFilter = this.projectData;
    this.sortUpdatedIconChange();
  }

  filter(mode: string) {
    this.productIsCollapsed = true;
    this.projectList = this.projectData;
    this.mode = mode;
    if (mode !== 'all') {
      let filterData = this.projectList.filter(
        (e) => e.industry.toLowerCase() === mode
      );

      console.log('mode: ' + mode);
      console.log('filter: ' + JSON.stringify(filterData));
      this.projectList = filterData;
    }
    this.industryFilterMode = this.industryMode.find(
      (e) => e.name.toLowerCase() === mode
    )?.value;
    this.projectFilter = this.projectList;
  }
  filterProduct(f: string) {
    console.log('filterProduct: ' + f);
    const result: IProject[] = this.projectData.filter((e) => e.product === f);
    this.projectList = result;
  }
  removeProject(p: IProject) {
    console.log(p.name);
    const dIndex = this.projectData.findIndex((e) => e.name === p.name);

    console.log(dIndex);
    this.projectData.splice(dIndex, 1);
    this.filter(this.mode!);
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
  deleteProject(p: IProject) {
    console.log('deleteProject');
    const modalRef = this.ngModalService.open(DeleteProjectModalComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.projectName = p.name;
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
        return a.created < b.created ? -1 : a.created > b.created ? 1 : 0;
      });
    } else {
      this.projectList.sort((a, b) => {
        return a.created > b.created ? -1 : a.created > b.created ? 1 : 0;
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
