import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class InvalidCallTimeException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'You cannot select the call time in past',
      errorCode: 'ENT-1061',
      name: 'INVALID_CALL_TIME',
      developerMessage: `We're unable to create appointment in past time for user with id: [${user_id}]`,
    });
  }
}
