import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AttachmentNotFoundException extends BaseException {
  constructor(customer_id?: string | any, id?: string | any) {
    super(HttpStatus.NOT_FOUND, {
      message: `Attachment Not Found`,
      errorCode: 'VC-1066',
      name: 'ATTACHMENT_NOT_FOUND',
      developerMessage: `Attachment not found again user Id [${customer_id}] and attachment Id [${id}`,
    });
  }
}
