import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubFeature } from 'app/model/project-template-interface';
import { District } from 'app/model/province-interface';
import { ApiService } from '@services/api.service';
import { IFilterLocation } from 'app/model/filter-location';

export interface Tag {
  name: string;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.scss'],
})
export class FilterLocationComponent implements OnInit {
  @Input() subLocation: SubFeature | undefined;
  @Input() District: District | undefined;
  @Output() deleteItem: EventEmitter<SubFeature> = new EventEmitter();
  @Input() filterLocationApi: IFilterLocation | undefined;
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.getFilterLocationAPI();
  }
  
  getFilterLocationAPI() {
    this.apiService
      .dynamicFilterLocationMockup().subscribe((data: any) => {
        this.filterLocationApi = data.body!;
        if (this.filterLocationApi?.resultCode === '20000') {
          console.log('Filter Location API -->' + JSON.stringify(this.filterLocationApi.resultData));
        }
      });
  }

  // show/hide District
  public show: boolean = false;
  filterProvince(option: any) {
    console.log('click', option);
    if (option !== null) {
      this.show = true;
      console.log('Show');
    } else {
      console.log('Hide');
    }
  }

  myControl = new FormControl();
  options: string[] = [
    'Bangkok',
    'Amnat Charoen',
    'Ang Thong',
    'Bueng Kan',
    'Kanchanaburi',
    'Buriram',
    'Chachoengsao',
    'Chainat',
    'Chaiyaphum',
    'Chanthaburi',
    'Chiang Mai',
  ];
  filteredOptions!: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

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
    console.log('delete' + this.subLocation);
    this.deleteItem.emit(this.subLocation);
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
