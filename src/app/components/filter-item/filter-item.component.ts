import { Component, Input, OnInit } from '@angular/core';
import { SubFeature } from 'app/model/project-template-interface';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { Options } from '@angular-slider/ngx-slider';
import { Tag } from 'app/model/project-template-interface';
// export interface Tag {
//   name: string;
//   value: string;
//   selected: boolean;
// }
@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
})
export class FilterItemComponent implements OnInit {
  ageSelected: any;
  genderSelected: any;
  searchFilterStr: string | undefined;
  @Input() subMenu: SubFeature[] | undefined;
  slider1: Options = {
    floor: 0.0,
    ceil: 1.0,
    step: 0.1,
    pushRange: true,
  };

  constructor() {}

  ngOnInit(): void {
    console.log(this.subMenu);
    this.setDefaultSelected();
  }
  async setDefaultSelected() {
    await this.subMenu?.forEach((e) => {
      e.search = '';
      e.itemList = [];
      e.tagSelect = [];
      e.item_value?.forEach((i) => {
        let item = {
          name: i,
          value: i,
          selected: false,
        };
        //   name: i,
        //   value: i,
        //   selected: false,
        // };
        e.itemList?.push(item);
      });
    });
  }

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
  selectItem(v: SubFeature) {
    const result: any = v.itemList
      ?.filter((e) => {
        return e.selected === true;
      })
      .map((j) => {
        return j.name;
      });
    v.tagSelect = [];
    v.tagSelect.push(...result);
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
