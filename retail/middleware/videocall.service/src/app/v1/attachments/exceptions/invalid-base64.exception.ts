import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class InvalidBase64Exception extends BaseException {
  constructor(id?: string | any) {
    super(HttpStatus.BAD_REQUEST, {
      message: `Invalid base64 string`,
      name: 'INVALID_BASE64_STRING',
      developerMessage: `Invalid base64 string, for attachment having Id: [${id}]`,
    });
  }
}
