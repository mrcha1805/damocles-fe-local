import { Component, OnInit } from '@angular/core';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { Options } from "@angular-slider/ngx-slider";
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

export interface Tag {
  name: string;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-filter-slider',
  templateUrl: './filter-slider.component.html',
  styleUrls: ['./filter-slider.component.scss']
})
export class FilterSliderComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  }
  
  // show/hide Add Criterion
  public show:boolean = false;
  public buttonName:any = 'Show';
  toggle() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  myControl = new FormControl()
  options: string[] = ['Propentity to buy a car', 'Propentity to buy a house', 'Propentity to buy a cat']
  objectOptions = [
    { name: 'Propentity to buy a car' },
    { name: 'Propentity to buy a house' },
    { name: 'Propentity to buy a cat' },
    { name: 'Propentity to buy a dog' }
  ]
  filteredOptions!: Observable<string[]>;

  // displayFn(subject: { name: any; }) {
  //   console.log(subject)
  //   return subject ? subject.name : undefined
  // }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    )
  }


  lowValue1: number = 0.3;
  highValue1: number = 0.8;
  slider1: Options = {
    floor: 0.0,
    ceil: 1.0,
    step: 0.1,
    pushRange: true,
  };

  lowValue2: number = 0.3;
  highValue2: number = 0.8;
  slider2: Options = {
    floor: 0.0,
    ceil: 1.0,
    step: 0.1,
    pushRange: true,
  };

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
