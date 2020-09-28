import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class UserNotFoundException extends BaseException {
  constructor(email?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'User Not Found',
      errorCode: 'ENT-1031',
      name: 'ENT_USER_NOT_FOUND',
      developerMessage: `User not found with email [${email}]`
    });
  }
}
