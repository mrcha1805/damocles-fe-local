import { Component, OnInit } from '@angular/core';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';

export interface Tag {
  name: string;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss'],
})
export class DemographicComponent implements OnInit {
  constructor() {}
  ageSelected: any;
  genderSelected: any;
  ageList: Tag[] = [
    {
      name: '25-34',
      value: 'age01',
      selected: false,
    },
    {
      name: '35-44',
      value: 'age02',
      selected: false,
    },
    {
      name: '45-54',
      value: 'age03',
      selected: false,
    },
    {
      name: '56-60',
      value: 'age04',
      selected: false,
    },
    {
      name: '>60',
      value: 'age05',
      selected: false,
    },
  ];

  genderList: Tag[] = [
    {
      name: 'Female',
      value: 'g1',
      selected: false,
    },
    {
      name: 'Male',
      value: 'g2',
      selected: false,
    },
    {
      name: 'Inferred Female',
      value: 'g3',
      selected: false,
    },
    {
      name: 'Inferred Male',
      value: 'g4',
      selected: false,
    },
  ];

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

  ngOnInit(): void {}

  selectAgeList(name: string, value: string) {
    const tagSelect = this.ageList
      .filter((item) => {
        return item.selected === true;
      })
      .map((item) => {
        return item.name;
      });
    this.ageSelected = [];
    this.ageSelected.push(...tagSelect);
  }
  selectGenderList(name: string, value: string) {
    const tagSelect = this.genderList
      .filter((item) => {
        return item.selected === true;
      })
      .map((item) => {
        return item.name;
      });
    this.genderSelected = [];
    this.genderSelected.push(...tagSelect);
  }
  deleteSelector() {
    console.log('delete');
  }

  removeTagAge(item: string): void {
    const index = this.ageSelected.indexOf(item);

    if (index >= 0) {
      this.ageSelected.splice(index, 1);
      this.ageList.map((i) => {
        if (i.name === item) {
          i.selected = !i.selected;
        }
      });
    }
  }

  removeTagGender(item: string): void {
    const index = this.genderSelected.indexOf(item);

    if (index >= 0) {
      this.genderSelected.splice(index, 1);
      this.genderList.map((i) => {
        if (i.name === item) {
          i.selected = !i.selected;
        }
      });
    }
  }
}
