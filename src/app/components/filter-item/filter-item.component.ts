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
  @Input() criterionData: ICriterionData | undefined;
  @Input() projectId: string | undefined;
  @Input() featureGroupId: string | undefined;
  slider1: Options = {
    floor: 0.0,
    ceil: 1.0,
    step: 0.1,
    pushRange: true,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    //console.log(this.subMenu);
    this.displayCriterionEmpty = true;
    this.criterionApiLoad = true;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.loadCriterion();
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

  // selectAgeList(name: string, value: string) {
  //   const tagSelect = this.ageList
  //     .filter((item) => {
  //       return item.selected === true;
  //     })
  //     .map((item) => {
  //       return item.name;
  //     });
  //   this.ageSelected = [];
  //   this.ageSelected.push(...tagSelect);
  // }
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
      let ind = this.criterionData?.subFeature.findIndex((e) => {
        return e.feature_name === dataSelect.feature_name;
      });
      this.subMenu?.push(dataSelect);
      this.criterionData?.subFeature.splice(ind!, 1);
      if (this.criterionData?.subFeature.length == 0) {
        this.displayCriterionEmpty = true;
      }
    }
  }
  deleteSelector(data: SubFeature) {
    console.log('delete' + JSON.stringify(data));
    if (data) {
      let ind = this.subMenu?.findIndex((e) => {
        return e.product_feature_id === data.product_feature_id;
      });
      console.log(ind);
      this.criterionData?.subFeature.push(data);
      this.subMenu?.splice(ind!, 1);
    }
  }

  loadCriterion() {
    // this.apiService.dynamicCriterionMockup().subscribe((data) => {
    //   this.criterionData = data.body?.resultData;
    //   console.log(this.criterionData);
    // });

    if (this.criterionApiLoad) {
      this.apiService
        .getCriterionAPI(this.projectId!, this.featureGroupId!)
        .subscribe((data) => {
          if (data.resultCode === '20000') {
            this.criterionData = data.resultData;
            this.displayCriterionEmpty = false;
            this.criterionApiLoad = false;

            console.log(this.criterionData);
            this.setDefaultSelected();
          }
        });
    }
  }

  // selectGenderList(name: string, value: string) {
  //   const tagSelect = this.genderList
  //     .filter((item) => {
  //       return item.selected === true;
  //     })
  //     .map((item) => {
  //       return item.name;
  //     });
  //   this.genderSelected = [];
  //   this.genderSelected.push(...tagSelect);
  // }

  // removeTagAge(item: string): void {
  //   const index = this.ageSelected.indexOf(item);

  //   if (index >= 0) {
  //     this.ageSelected.splice(index, 1);
  //     this.ageList.map((i) => {
  //       if (i.name === item) {
  //         i.selected = !i.selected;
  //       }
  //     });
  //   }
  // }

  //   removeTagGender(item: string): void {
  //     const index = this.genderSelected.indexOf(item);

  //     if (index >= 0) {
  //       this.genderSelected.splice(index, 1);
  //       this.genderList.map((i) => {
  //         if (i.name === item) {
  //           i.selected = !i.selected;
  //         }
  //       });
  //     }
  //   }
}
