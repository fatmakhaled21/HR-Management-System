import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items:any[],selectedValue:any,field:string): any[] {
 if(!items || selectedValue === '' || selectedValue === null ){
  return items
 }
return items.filter((item) => {
  const value = field
    .split('.')
    .reduce((current: any, key: string) => current?.[key], item);

    return value?.toString().toLowerCase()
      === selectedValue.toString().toLowerCase();
});
 }

}
