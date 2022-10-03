import { Pipe, PipeTransform } from '@angular/core';
import { ILocationData } from 'app/model/location-interface';

@Pipe({
  name: 'locationSearch',
})
export class LocationSearchPipe implements PipeTransform {
  transform(items: ILocationData[], searchText: string): ILocationData[] {
    searchText = searchText.toLowerCase();
    let data: ILocationData[] = items;
    if (searchText !== '') {
      data = data.filter((e) => {
        return e.province_name?.toLowerCase().includes(searchText);
      });
    }
    return data;
  }
}
