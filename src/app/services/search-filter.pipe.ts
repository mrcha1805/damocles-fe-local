import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { IProject } from 'src/app/model/project-interface';
@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: IProject[], searchText: string): IProject[] {
    searchText = searchText.toLowerCase();
    let filteredItems: IProject[] = items;
    if (searchText != '') {
      filteredItems = filteredItems.filter((e) => {
        return (
          e.name.toLowerCase().includes(searchText) ||
          e.description.toLowerCase().includes(searchText) ||
          e.industry.toLowerCase().includes(searchText) ||
          e.product.toLowerCase().includes(searchText)
        );
      });
    }
    return filteredItems;
  }
}
