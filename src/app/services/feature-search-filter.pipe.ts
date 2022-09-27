import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from 'app/model/project-template-interface';

@Pipe({
  name: 'featureSearchFilter',
})
export class FeatureSearchFilterPipe implements PipeTransform {
  transform(items: Tag[], searchText: string): Tag[] {
    searchText = searchText.toLowerCase();
    let tags: Tag[] = items;
    if (searchText !== '') {
      tags = tags.filter((e) => {
        return e.name.toLowerCase().includes(searchText);
      });
    }
    return tags;
  }
}
