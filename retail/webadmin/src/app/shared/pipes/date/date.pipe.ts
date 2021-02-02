import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DATES } from '@shared/constants/app.constants';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, DATES.DATE_FMT);
  }
}