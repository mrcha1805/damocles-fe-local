import { Component, Input, OnInit } from '@angular/core';
import { Featuregroup } from 'app/model/project-template-interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  menuIndex: string = '1';
  @Input() menu: Featuregroup[] | undefined;
  @Input() projectId: string | undefined;

  ngOnInit(): void {
    this.menuIndex = '1';
  }
  setSelection(index: string) {
    this.menuIndex = index;
  }
}
