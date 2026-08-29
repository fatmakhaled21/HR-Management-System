import { Pipe, PipeTransform } from '@angular/core';
import { Employees } from '../interface/employees';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

 transform(items: any[], term: string, field: string): any[] {
 if(!items || !items){
  return items
 }
return items.filter((item) => {
  const value = field
    .split('.')
    .reduce((current: any, key: string) => current?.[key], item);
  return value
    ?.toString()
    .toLowerCase()
    .includes(term.toLowerCase());
});
 }


}


