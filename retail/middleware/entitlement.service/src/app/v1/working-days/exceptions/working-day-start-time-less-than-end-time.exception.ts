import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class WorkingDayStartTimeLessThanEndTimeException extends BaseException {
  constructor(working_day_id?: string, start_time?: string, end_time?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'Working Day start time should be less than end time',
      errorCode: 'ENT-1003',
      name: 'WORKING_DAY_START_TIME_LESS_THAN_END_TIME',
      developerMessage: `Working Day with Id [${working_day_id}] should have start-time-local [${start_time}] less than end-time-local [${end_time}]`
    });
  }
}
