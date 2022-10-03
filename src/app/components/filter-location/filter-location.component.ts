import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { Observable } from 'rxjs';
import { SubFeature } from 'app/model/project-template-interface';
import { District } from 'app/model/province-interface';
import { ApiService } from '@services/api.service';
import {
  IDistrict,
  ILocationData,
  ILocationDataSelected,
} from 'app/model/location-interface';

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

  constructor(private apiService: ApiService) {}

  locationApiData: ILocationData[] = [];
  proviceDataSelect: ILocationDataSelected[] = [];
  currentSelectProvince!: ILocationData;
  districtDataDisplay: IDistrict[] = [];
  searchText: string | undefined;
  ngOnInit() {
    this.searchText = '';
    this.locationApiData = [];
    this.proviceDataSelect = [];
    this.districtDataDisplay = [];
    this.callFilterLocationAPI();
  }

  callFilterLocationAPI() {
    this.apiService.getFilterLocationAPI().subscribe((data) => {
      if (data.resultCode === '20000') {
        const api: ILocationData[] = data.resultData;

        api.forEach((m) => {
          return m.district.unshift({
            district_id: 0,
            district_name: 'All',
          });
        });

        api.forEach((element) => {
          element.district.map((m) => {
            return (m.selected = false);
          });
        });
        this.locationApiData = api;
        console.log(this.locationApiData);
      }
    });
  }

  selectProvince(province: ILocationData) {
    this.districtDataDisplay = [];
    this.districtDataDisplay = province.district;
    if (this.districtDataDisplay.length > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.currentSelectProvince = province;
    console.log('select province: ' + province.province_name);
  }
  selectDistrict(province: ILocationData, district: IDistrict) {
    console.log(
      'select district: ' +
        district.district_name +
        ' select: ' +
        district.selected +
        ' province: ' +
        province.province_name
    );
    if (district.selected) {
      const pr: ILocationDataSelected = {
        province_id: province.province_id,
        province_id_name: province.province_id_name,
        province_name: province.province_name,
        district: [],
      };
      pr.district.push(district);
      pr.province_tag = province.province_name + ', ' + district.district_name;
      this.proviceDataSelect.push(pr);
      console.log('list: ' + JSON.stringify(this.proviceDataSelect));
    }
  }
  removeTagProvinceSelect(rm: ILocationData) {
    console.log('remove tag: ' + rm);
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

  // myControl = new FormControl();
  // options: string[] = [
  //   'Bangkok',
  //   'Amnat Charoen',
  //   'Ang Thong',
  //   'Bueng Kan',
  //   'Kanchanaburi',
  //   'Buriram',
  //   'Chachoengsao',
  //   'Chainat',
  //   'Chaiyaphum',
  //   'Chanthaburi',
  //   'Chiang Mai',
  // ];
  filteredOptions!: Observable<string[]>;

  // private _filter(value: string): string[] {
  //   // const filterValue = value.toLowerCase();
  //   // return this.options.filter((option) =>
  //   //   option.toLowerCase().includes(filterValue)
  //   // );
  // }

  // ageSelected: any;
  // genderSelected: any;
  // ageList: Tag[] = [
  //   {
  //     name: '25-34',
  //     value: 'age01',
  //     selected: false,
  //   },
  //   {
  //     name: '35-44',
  //     value: 'age02',
  //     selected: false,
  //   },
  //   {
  //     name: '45-54',
  //     value: 'age03',
  //     selected: false,
  //   },
  //   {
  //     name: '56-60',
  //     value: 'age04',
  //     selected: false,
  //   },
  //   {
  //     name: '>60',
  //     value: 'age05',
  //     selected: false,
  //   },
  //   {
  //     name: '25-34',
  //     value: 'age01',
  //     selected: false,
  //   },
  //   {
  //     name: '35-44',
  //     value: 'age02',
  //     selected: false,
  //   },
  //   {
  //     name: '45-54',
  //     value: 'age03',
  //     selected: false,
  //   },
  //   {
  //     name: '56-60',
  //     value: 'age04',
  //     selected: false,
  //   },
  //   {
  //     name: '>60',
  //     value: 'age05',
  //     selected: false,
  //   },
  //   {
  //     name: '25-34',
  //     value: 'age01',
  //     selected: false,
  //   },
  //   {
  //     name: '35-44',
  //     value: 'age02',
  //     selected: false,
  //   },
  //   {
  //     name: '45-54',
  //     value: 'age03',
  //     selected: false,
  //   },
  //   {
  //     name: '56-60',
  //     value: 'age04',
  //     selected: false,
  //   },
  //   {
  //     name: '>60',
  //     value: 'age05',
  //     selected: false,
  //   },
  // ];

  // genderList: Tag[] = [
  //   {
  //     name: 'Female',
  //     value: 'g1',
  //     selected: false,
  //   },
  //   {
  //     name: 'Male',
  //     value: 'g2',
  //     selected: false,
  //   },
  //   {
  //     name: 'Inferred Female',
  //     value: 'g3',
  //     selected: false,
  //   },
  //   {
  //     name: 'Inferred Male',
  //     value: 'g4',
  //     selected: false,
  //   },
  // ];

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
    // const tagSelect = this.ageList
    //   .filter((item) => {
    //     return item.selected === true;
    //   })
    //   .map((item) => {
    //     return item.name;
    //   });
    // this.ageSelected = [];
    // this.ageSelected.push(...tagSelect);
  }
  selectGenderList(name: string, value: string) {
    // const tagSelect = this.genderList
    //   .filter((item) => {
    //     return item.selected === true;
    //   })
    //   .map((item) => {
    //     return item.name;
    //   });
    // this.genderSelected = [];
    // this.genderSelected.push(...tagSelect);
  }
  deleteSelector() {
    console.log('delete' + this.subLocation);
    this.deleteItem.emit(this.subLocation);
  }

  removeTagAge(item: string): void {
    // const index = this.ageSelected.indexOf(item);
    // if (index >= 0) {
    //   this.ageSelected.splice(index, 1);
    //   this.ageList.map((i) => {
    //     if (i.name === item) {
    //       i.selected = !i.selected;
    //     }
    //   });
    // }
  }

  removeTagGender(item: string): void {
    // const index = this.genderSelected.indexOf(item);
    // if (index >= 0) {
    //   this.genderSelected.splice(index, 1);
    //   this.genderList.map((i) => {
    //     if (i.name === item) {
    //       i.selected = !i.selected;
    //     }
    //   });
    // }
  }
}
