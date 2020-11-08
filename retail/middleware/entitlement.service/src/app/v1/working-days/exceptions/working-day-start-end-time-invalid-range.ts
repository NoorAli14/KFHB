import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class WorkingDayStartEndTimeInvalidRange extends BaseException {
  constructor(working_day_id?: string, start_time?: string, end_time?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'Working Day start-time/end-time should be in range [0000-2359]',
      name: 'WORKING_DAY_START_TIME_END_TIME_INVALID_RANGE',
      developerMessage: `Working Day with Id [${working_day_id}] should have start_time_local [${start_time}] / end_time_local [${end_time}] in range [0000-2359]`,
    });
  }
}
