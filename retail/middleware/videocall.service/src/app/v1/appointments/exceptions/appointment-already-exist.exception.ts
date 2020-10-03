import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AppointmentAlreadyExistException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Appointment already exist against this user.',
      errorCode: 'VC-1060',
      name: 'APPOINTMENT_ALREADY_EXIST',
      developerMessage: `Appointment already exist against user with Id [${user_id}]`,
    });
  }
}
