import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class BadRequestException extends BaseException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, {
      message: 'Bad Request',
      name: 'BAD_REQUEST',
      developerMessage: `Request is not correct`,
    });
  }
}
