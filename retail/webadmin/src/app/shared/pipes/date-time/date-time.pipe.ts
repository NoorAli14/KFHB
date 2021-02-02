import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DATES } from '@shared/constants/app.constants';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, DATES.DATE_TIME_FMT);
  }
}