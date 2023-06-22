import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'MonthYear' })
export class UniqueMonthYearPipe implements PipeTransform {
  transform(dates) {
    var value = Math.floor(dates) / 12
    return Math.round(value);
  }
}