import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class UserNotFoundException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'User Not Found',
      name: 'USER_NOT_FOUND',
      developerMessage: `User not found with Id [${user_id}]`,
    });
  }
}
