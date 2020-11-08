import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class CountryNotFoundException extends BaseException {
  constructor(country_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Country Not Found',
      name: 'COUNTRY_NOT_FOUND',
      developerMessage: `Country not found with Id [${country_id}]`,
    });
  }
}
