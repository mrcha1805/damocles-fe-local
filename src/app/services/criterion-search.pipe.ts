import { Pipe, PipeTransform } from '@angular/core';
import { SubFeature } from 'app/model/project-template-interface';

@Pipe({
  name: 'criterionSearch',
})
export class CriterionSearchPipe implements PipeTransform {
  transform(items: SubFeature[], search: string): SubFeature[] {
    search = search.toLowerCase();
    let filterItems: SubFeature[] = items;
    if (search != '') {
      filterItems = filterItems.filter((e) => {
        return e.feature_name.toLowerCase().includes(search);
      });
    }
    return filterItems;
  }
}
