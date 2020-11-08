import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class WorkingDayAlreadyExistException extends BaseException {
  constructor(working_day_id?: string) {
    super(HttpStatus.CONFLICT, {
      message: 'Working Day already exists',
      name: 'WORKING_DAY_ALREADY_EXIST',
      developerMessage: `Working Day already exists with Id [${working_day_id}]`,
    });
  }
}
