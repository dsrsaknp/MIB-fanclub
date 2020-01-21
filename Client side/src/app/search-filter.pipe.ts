import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(searchData: any[], search: string): any {
    if (search === '' || search === undefined) { return searchData; }
    return searchData.filter(arr => {
      return arr.name.toLowerCase().includes(search.toLowerCase());
    });
  }

}
