import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AppointmentNotFoundException extends BaseException {
  constructor(from_time?: string | any, to_time?: string | any) {
    super(HttpStatus.NOT_FOUND, {
      message: `Appointment not found`,
      name: 'APPOINTMENT_NOT_FOUND',
      developerMessage: `Appointment not found during [${from_time}] to [${to_time}]`,
    });
  }
}
