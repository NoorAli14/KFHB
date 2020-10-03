import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class BadRequestException extends BaseException {
  constructor(id?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'Bad Request',
      errorCode: 'ENT-1052',
      name: 'ENT_BAD_REQUEST',
      developerMessage: `Request is not correct`,
    });
  }
}
