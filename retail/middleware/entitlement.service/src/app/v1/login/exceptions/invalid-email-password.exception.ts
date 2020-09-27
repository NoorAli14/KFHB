import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class InvalidEmailPasswordException extends BaseException {
  constructor(email?: string) {
    super(HttpStatus.UNAUTHORIZED, {
      message: 'Invalid Email or Password',
      errorCode: 'ENT-1041',
      name: 'ENT_INVALID_EMAIL_PASSWORD',
      developerMessage: `User email or password is not correct, email [${email}]`,
    });
  }
}
