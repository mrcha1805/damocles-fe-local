import { Component, Input, OnInit } from '@angular/core';
import { SubFeature } from 'app/model/project-template-interface';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { Options } from '@angular-slider/ngx-slider';
import { Tag } from 'app/model/project-template-interface';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.setDefaultSelected();
  }
  private _filter(value: any): any {
    const filterValue = value.toLowerCase()
    return this.options.filter(option =>
      option.toLocaleLowerCase().includes(filterValue)
    )
    // throw new Error('Method not implemented.');
  }
  myControl = new FormControl();
  options: string[] = [
    'Propentity to buy a car',
    'Propentity to buy a house',
    'Propentity to buy a cat',
  ];
  filteredOptions!: Observable<string[]>;

  async setDefaultSelected() {
    console.log('test', this.options.length);
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
  addTag(v: SubFeature) {
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
  deleteTag(name: string, v: SubFeature) {
    const rs: any = v.itemList
      ?.filter((r) => {
        return r.name == name;
      })
      .map((s) => {
        return (s.selected = false);
      });
    this.addTag(v);
  }

  criterion(option: any) {
    console.log('click', option);
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
