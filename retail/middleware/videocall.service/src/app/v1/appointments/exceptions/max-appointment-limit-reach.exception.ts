import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class MaxAppointLimitReachException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: `Appointment cannot be saved at this time, Please choose another time.`,
      errorCode: 'ENT-1065',
      name: 'MAX_APPOINTMENT_REACHED',
      developerMessage: `Appointment cannot be saved at this time, Please choose another time [${user_id}]`,
    });
  }
}
