import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class NotCreatedException extends BaseException {
  constructor(screenshot_id?: string | any) {
    super(HttpStatus.BAD_REQUEST, {
      message: `Unable to create or save screenshot`,
      errorCode: 'VC-1068',
      name: 'ATTACHMENT_NOT_CREATED',
      developerMessage: `Unable to create or save screenshot: [${screenshot_id}]`,
    });
  }
}
