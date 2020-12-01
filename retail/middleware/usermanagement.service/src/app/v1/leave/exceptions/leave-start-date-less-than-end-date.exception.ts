import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class LeaveStartDateLessThanEndDateException extends BaseException {
  constructor(leave_id?: string, start_date?: string, end_date?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'Leave start date should be less than end date',
      name: 'LEAVE_START_DATE_LESS_THAN_END_DATE',
      developerMessage: `Leave with Id [${leave_id}] should have start-date [${start_date}] less than end-date [${end_date}]`,
    });
  }
}
