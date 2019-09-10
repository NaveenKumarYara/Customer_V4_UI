import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'MonthYear' })
export class UniqueMonthYearPipe implements PipeTransform {
  transform(dates) {
    return Math.floor(dates) / 12
  }
}