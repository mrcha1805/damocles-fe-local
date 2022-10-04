import { Component, Input, OnInit } from '@angular/core';
import { SubFeature } from 'app/model/project-template-interface';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { Options } from '@angular-slider/ngx-slider';
import { Tag } from 'app/model/project-template-interface';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import { ICriterionData } from 'app/model/criterion-interface';
import { remove } from 'lodash';
import { IDataFilter } from 'app/model/cube-interface';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
})
export class FilterItemComponent implements OnInit {
  ageSelected: any;
  genderSelected: any;
  searchFilterStr: string | undefined;
  search: string = '';
  displayCriterionEmpty: boolean = true;
  criterionApiLoad: boolean = true;
  @Input() subMenu: SubFeature[] | undefined;
  @Input() projectId: string | undefined;
  @Input() featureGroupId: string | undefined;
  @Input() filterUser: IDataFilter[] | undefined;

  slider1: Options = {
    floor: 0.0,
    ceil: 1.0,
    step: 0.1,
    pushRange: true,
  };

  constructor(private apiService: ApiService) {}
  // userCount: number = 0;
  // userFormat: string | undefined;
  ngOnInit(): void {
    this.displayCriterionEmpty = true;
    this.criterionApiLoad = true;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // this.userCount = 0;
    // this.userFormat = this.userCount + ' user';
    this.loadCriterion();
    //this.mapFilterUser();
  }

  // show data select
  changeSelect(e: any) {
    console.log('changeSelect', e.target.value);
  }

  private _filter(value: any): any {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLocaleLowerCase().includes(filterValue)
    );
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

  criterion(dataSelect: SubFeature) {
    if (dataSelect) {
      let ind = this.criterionDisplay.findIndex((e) => {
        return e.feature_name === dataSelect.feature_name;
      });
      this.subMenu?.push(dataSelect);
      this.criterionDisplay.splice(ind!, 1);
      if (this.criterionDisplay.length == 0) {
        this.displayCriterionEmpty = true;
      }
    }
  }
  deleteSelector(data: SubFeature) {
    if (data) {
      this.criterionDisplay.push(data);
      this.displayCriterionEmpty = false;
      let ind = this.subMenu?.findIndex((e) => {
        return e.feature_name === data.feature_name;
      });
      console.log(ind);
      this.subMenu?.splice(ind!, 1);
    }
  }

  loadCriterion() {
    if (this.criterionApiLoad) {
      this.apiService
        .getCriterionAPI(this.projectId!, this.featureGroupId!)
        .subscribe((data) => {
          if (data.resultCode === '20000') {
            this.criterionApiLoad = false;
            this.checkDuplicateCriterion(data.resultData);
          }
        });
    }
  }
  criterionDisplay: SubFeature[] = [];
  checkDuplicateCriterion(data: ICriterionData) {
    this.criterionDisplay = [];
    this.displayCriterionEmpty = true;
    for (let item of data.subFeature) {
      const result = this.subMenu?.filter((e) => {
        return e.feature_name === item.feature_name;
      });
      if (result?.length! > 0) {
        console.log('Found: ' + JSON.stringify(result));
      } else {
        this.criterionDisplay.push(item);
        this.displayCriterionEmpty = false;
      }
    }
    this.setDefaultSelected();
  }

  dataFilterUser: any = [];
  mapFilterUser() {
    this.subMenu?.forEach((e) => {
      let sumUser: string = '0 users';
      this.filterUser?.forEach((f) => {
        if (e.feature_name.includes(f.feature)) {
          if (!f.sum || f.sum == 0) {
            sumUser = '0 users';
          } else {
            sumUser = `${f.sum} user`;
          }
        }
      });
      this.dataFilterUser.push(sumUser);
      e.filterUser11 = sumUser;
    });
    console.log(`=======sub menu ${JSON.stringify(this.subMenu)} `);
  }
  updateUser(str: string) {
    let nameDisplay: string | undefined;
    if (this.filterUser && this.filterUser?.length > 0) {
      let n = this.filterUser.filter((e) => {
        return e.feature === str;
      });
      if (n.length > 0) {
        if (n[0].sum > 1) {
          nameDisplay = n[0].sum + ' users';
        } else {
          nameDisplay = n[0].sum + ' user';
        }
      } else {
        nameDisplay = '0 user';
      }
    } else {
      nameDisplay = '0 user';
    }
    return nameDisplay;
  }
}
