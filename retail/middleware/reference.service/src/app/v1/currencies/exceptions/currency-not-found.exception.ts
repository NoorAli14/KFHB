import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class CurrencyNotFoundException extends BaseException {
  constructor(currency_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Currency Not Found',
      name: 'CURRENCY_NOT_FOUND',
      developerMessage: `Currency not found with Id [${currency_id}]`,
    });
  }
}
