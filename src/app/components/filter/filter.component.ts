import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDataFilter } from 'app/model/cube-interface';
import { Featuregroup, SubFeature } from 'app/model/project-template-interface';

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
  @Input() productId: string | undefined;
  @Input() filterUser: IDataFilter[] | undefined;

  @Output() featureGroupOutput: EventEmitter<Featuregroup[]> =
    new EventEmitter();
  ngOnInit(): void {
    this.menuIndex = '1';
  }
  setSelection(index: string) {
    this.menuIndex = index;
  }

  dataOutput(output: SubFeature[]) {
    //  this.feaureGroupOutput.emit(output);
    console.log('subgroup filter.ts : ' + JSON.stringify(output));
    this.featureGroupOutput.emit(this.menu);
  }
}
