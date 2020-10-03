import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AppointmentNotFoundException extends BaseException {
  constructor(from_time?: string | any, to_time?: string | any) {
    console.log(`Id -0-0-0-0-0 [${from_time}]`);
    super(HttpStatus.NOT_FOUND, {
      message: `Appointment not found`,
      errorCode: 'VC-1063',
      name: 'APPOINTMENT_NOT_FOUND',
      developerMessage: `Appointment not found during [${from_time}] to [${to_time}]`,
    });
  }
}
