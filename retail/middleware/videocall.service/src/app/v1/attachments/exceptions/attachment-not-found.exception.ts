import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AttachmentNotFoundException extends BaseException {
  constructor(user_id?: string | any, screenshot_id?: string | any) {
    super(HttpStatus.NOT_FOUND, {
      message: `Attachment Not Found`,
      errorCode: 'VC-1066',
      name: 'ATTACHMENT_NOT_FOUND',
      developerMessage: `Attachment not found again user Id [${user_id}] and attachment Id [${screenshot_id}`,
    });
  }
}
