import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss'],
})
export class DemographicComponent implements OnInit {
  constructor() {}

  ageList = [
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

  genderList = [
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
  ngOnInit(): void {}
  selectAgeList(name: string, value: string) {
    console.log(name);
    console.log(value);
  }
  selectGenderList(name: string, value: string) {
    console.log(name);
    console.log(value);
  }
  deleteSelector() {
    console.log('delete');
  }
}
