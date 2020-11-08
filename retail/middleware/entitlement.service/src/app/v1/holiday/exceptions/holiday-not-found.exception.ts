import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class HolidayNotFoundException extends BaseException {
  constructor(holiday_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Holiday Not Found',
      name: 'HOLIDAY_NOT_FOUND',
      developerMessage: `Holiday not found with Id [${holiday_id}]`,
    });
  }
}
