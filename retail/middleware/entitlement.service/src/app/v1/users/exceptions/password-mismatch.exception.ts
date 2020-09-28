import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class PasswordMismatchException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'Password Mismatch',
      errorCode: 'ENT-1032',
      name: 'ENT_USER_PASSWORD_MISMATCH',
      developerMessage: `User password is not correct, user_id [${user_id}]`,
    });
  }
}
