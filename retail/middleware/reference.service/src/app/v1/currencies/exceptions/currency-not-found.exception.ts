import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class CurrencyNotFoundException extends BaseException {
  constructor(currency_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Currency Not Found',
      errorCode: 'ENT-1002',
      name: 'CURRENCY_NOT_FOUND',
      developerMessage: `Currency not found with Id [${currency_id}]`,
    });
  }
}
