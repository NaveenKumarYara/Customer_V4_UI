import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'skillmonths',
    pure: false
})
export class ConvertMonthPipe implements PipeTransform {
    transform(months) {
        if(months!=null || months!=undefined)
        {
        var years = Math.floor(months/12);
        var month = months % 12;
        return years + '.' + month;
        }
      }
}