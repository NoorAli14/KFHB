import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class NoAppointmentTodayException extends BaseException {
  constructor(start_date?: string, end_date?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: `There is no appointment against today's data`,
      errorCode: 'VC-1064',
      name: 'NO_APPOINTMENT_TODAY',
      developerMessage: `We're unable to find any appointment in between [${start_date}] - [${end_date}]`,
    });
  }
}
