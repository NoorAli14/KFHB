import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class NotCreatedException extends BaseException {
  constructor(id?: string | any) {
    super(HttpStatus.BAD_REQUEST, {
      message: `Unable to create or save attachment`,
      name: 'ATTACHMENT_NOT_CREATED',
      developerMessage: `Unable to create or save attachment: [${id}]`,
    });
  }
}
