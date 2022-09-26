import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { IProject } from 'src/app/model/project-interface';
@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: IProject[], searchText: string, metaData: any): IProject[] {
    searchText = searchText.toLowerCase();
    let filteredItems: IProject[] = items;
    if (searchText != '') {
      filteredItems = filteredItems.filter((e) => {
        return (
          e.product_name.toLowerCase().includes(searchText) ||
          e.project_description.toLowerCase().includes(searchText) ||
          e.industry_name.toLowerCase().includes(searchText) ||
          e.product_name.toLowerCase().includes(searchText)
        );
      });
    }

    metaData.data = filteredItems;
    return filteredItems;
  }
}
