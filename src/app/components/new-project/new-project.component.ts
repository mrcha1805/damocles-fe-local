import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProject } from 'src/app/model/project-interface';

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
    private spinnerService: NgxSpinnerService
  ) {
    this.typeSelected = 'ball-atom';
  }

  projectMasterData: IProject[] = [
    {
      name: 'FlexiDrive 202206',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-09-13T07:56:36.000Z',
      industry: 'Insurance',
      product: 'Travel Insurance',
    },
    {
      name: 'Easy Easy 2+ 3+ 202209',
      description: 'For 2+ 3+ Car owner',
      created: '2022-09-09T01:50:36.000Z',
      industry: 'Insurance',
      product: 'Travel Insurance',
    },
    {
      name: 'Travel Insurance 202207',
      description: 'Genral Travel Insurance Propensity to Travel',
      created: '2022-09-03T03:13:36.000Z',
      industry: 'Insurance',
      product: 'Health Insurance',
    },
    {
      name: 'Travel Freemium 202208',
      description: 'Size of user who hav propensity to travel',
      created: '2022-08-09T08:13:36.000Z',
      industry: 'Insurance',
      product: 'Travel Insurance',
    },
    {
      name: 'FlexiDrive 202201',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-01-11T07:56:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
    },
    {
      name: 'Travel Freemium 2022004',
      description: 'Size of user who hav propensity to travel',
      created: '2022-04-05T19:32:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
    },
    {
      name: 'FlexiDrive 202202',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-02-24T10:34:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
    },
    {
      name: 'Travel Freemium CA',
      description: 'Size of user who hav propensity to travel',
      created: '2022-02-24T12:34:36.000Z',
      industry: 'Insurance',
      product: 'Travel Insurance',
    },
    {
      name: 'FlexiDrive ACS',
      description: '4 Persona : Somjad , BiBi, Jennie, Tik',
      created: '2022-01-11T07:56:36.000Z',
      industry: 'Banking',
      product: 'Health Insurance',
    },
  ];
  projectList: IProject[] = [];
  projectData: IProject[] = [];
  projectFilter: IProject[] = [];
  mode: string | undefined;
  search: string = '';
  productList = [
    {
      name: 'Travel Insurance',
      value: 10,
    },
    {
      name: 'Health Insurance',
      value: 11,
    },
  ];
  ngOnInit(): void {
    this.projectList = [];
    this.projectData = [];
    this.projectFilter = [];
    this.mode = 'all';
    this.projectList =
      this.projectFilter =
      this.projectData =
        this.projectMasterData;
  }
  filter(mode: string) {
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
    this.projectFilter = this.projectList;
  }
  filterProduct(f: string) {
    const result: IProject[] = this.projectFilter.filter(
      (e) => e.product === f
    );
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
}
