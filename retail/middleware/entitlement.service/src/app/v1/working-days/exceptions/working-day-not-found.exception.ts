import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class WorkingDayNotFoundException extends BaseException {
  constructor(working_day_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Working Day Not Found',
      errorCode: 'ENT-1001',
      name: 'WORKING_DAY_NOT_FOUND',
      developerMessage: `Working Day not found with Id [${working_day_id}]`
    });
  }
}
