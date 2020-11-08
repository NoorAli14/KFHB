import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AppointmentAlreadyExistException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'Appointment already exist against this user.',
      name: 'APPOINTMENT_ALREADY_EXIST',
      developerMessage: `Appointment already exist against user with Id [${user_id}]`,
    });
  }
}
