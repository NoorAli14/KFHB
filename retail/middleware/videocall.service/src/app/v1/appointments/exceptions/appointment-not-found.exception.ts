import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AppointmentNotFoundException extends BaseException {
  constructor(id?: string) {
    console.log(`Id -0-0-0-0-0 [${id}]`);
    super(HttpStatus.NOT_FOUND, {
      message: `Appointment not found`,
      errorCode: 'ENT-1063',
      name: 'APPOINTMENT_NOT_FOUND',
      developerMessage: `Appointment not found against Id: [${id}]`,
    });
  }
}
