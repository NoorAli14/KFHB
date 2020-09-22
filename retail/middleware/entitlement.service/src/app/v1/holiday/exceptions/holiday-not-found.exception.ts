import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class HolidayNotFoundException extends BaseException {
  constructor(holiday_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Holiday Not Found',
      errorCode: 'ENT-1011',
      name: 'HOLIDAY_NOT_FOUND',
      developerMessage: `Holiday not found with Id [${holiday_id}]`
    });
  }
}
