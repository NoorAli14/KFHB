import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class TemplateResponseNotFoundException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'KYC detail missing',
      name: 'TEMPLATE_RESPONSE_NOT_FOUND',
      developerMessage: `Template response not found against user with Id [${user_id}]`,
    });
  }
}
