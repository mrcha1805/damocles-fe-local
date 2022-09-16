import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProject } from 'src/app/model/project-interface';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DeleteProjectModalComponent } from 'src/app/modals/delete-project-modal/delete-project-modal.component';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
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
    {
      name: 'FlexiDrive 202201',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-01-11T07:56:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Travel Freemium 2022004',
      description: 'Size of user who hav propensity to travel',
      created: '2022-04-05T19:32:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'FlexiDrive 202206',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-09-13T07:56:36.000Z',
      industry: 'Insurance',
      product: 'Travel Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Easy Easy 2+ 3+ 202209',
      description: 'For 2+ 3+ Car owner',
      created: '2022-09-09T01:50:36.000Z',
      industry: 'Insurance',
      product: 'Travel Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Travel Insurance 202207',
      description: 'Genral Travel Insurance Propensity to Travel',
      created: '2022-09-03T03:13:36.000Z',
      industry: 'Insurance',
      product: 'Health Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Travel Freemium 202208',
      description: 'Size of user who hav propensity to travel',
      created: '2022-08-09T08:13:36.000Z',
      industry: 'Insurance',
      product: 'Travel Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'FlexiDrive 202201',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-01-11T07:56:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Travel Freemium 2022004',
      description: 'Size of user who hav propensity to travel',
      created: '2022-04-05T19:32:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'FlexiDrive 202202',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-02-24T10:34:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'Travel Freemium CA',
      description: 'Size of user who hav propensity to travel',
      created: '2022-02-24T12:34:36.000Z',
      industry: 'Insurance',
      product: 'Travel Insurance',
      timeFormat: '',
      timeLabel: '',
    },
    {
      name: 'FlexiDrive ACS',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-01-11T07:56:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
      timeFormat: '',
      timeLabel: '',
    },
  ];
  projectList: IProject[] = [];
  projectData: IProject[] = [];
  projectFilter: IProject[] = [];
  mode: string | undefined;
  search: string = '';
  sortUpdateIcon: boolean = false;
  productIcon: string | undefined;
  pIcon: boolean | undefined;
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
      name: 'Travel Insurance',
      value: 14,
    },
  ];
  async ngOnInit(): Promise<void> {
    this.projectList = [];
    this.projectData = [];
    this.projectFilter = [];
    this.mode = 'all';
    this.sortUpdateIcon = true;

    //product menu
    this.productIcon = './assets/icons/navbar-arrow.svg';
    this.pIcon = false;
    this.projectData = this.projectMasterData;
    await this.setData();
  }
  async setData() {
    for (let i of this.projectData) {
      console.log(i.created);
      i.timeFormat = this.datePipe
        .transform(i.created, 'd MMM, hh:mm:ss')
        ?.toString();
    }
    console.log(this.projectData);
    this.projectList = this.projectFilter = this.projectData;
  }

  isCollapsed = -1;

  filter(mode: string) {
    this.isCollapsed = -1;
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

    this.sortData();
    this.projectFilter = this.projectList;
  }
  filterProduct(f: string) {
    console.log('filterProduct: ' + f);
    const result: IProject[] = this.projectFilter.filter(
      (e) => e.product === f
    );
    this.projectList = result;
    this.sortData();
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
    });
    modalRef.componentInstance.projectName = p.name;
    modalRef.result.then((result: any) => {
      if (result.search('deleting') != -1) {
        this.removeProject(p);
        // TODO: update project lists
      }
    });
  }

  getDefaultUpdatedIcon() {
    let image: any;
    if (!this.sortUpdateIcon) {
      image = './assets/icons/sortba.svg';
    } else {
      image = './assets/icons/sortab.svg';
    }
    return image;
  }
  orderByUpdated(e: any) {
    console.log('order by update' + e.src);
    this.sortUpdateIcon = !this.sortUpdateIcon;
    if (e.src.includes('sortab')) {
      e.src = './assets/icons/sortba.svg';
      this.sortData();
    } else {
      e.src = './assets/icons/sortab.svg';
      this.sortData();
    }
  }

  _sortUpdated(a: IProject, b: IProject) {
    // if (a.timeFormat < b.timeFormat) {
    //   return -1;
    // }
    // return -1;
  }
  sortData() {
    //this.projectList = this.projectList.sort(this._sortUpdated);
  }

  productIconChange() {
    this.isCollapsed = 1;
    // this.pIcon = !this.pIcon;
    // if (!this.pIcon) {
    //   this.productIcon = './assets/icons/sortba.svg';
    // } else {
    //   this.productIcon = './assets/icons/sortab.svg';
    // }
  }
}