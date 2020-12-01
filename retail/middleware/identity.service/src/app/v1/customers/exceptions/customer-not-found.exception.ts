import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class CustomerNotFoundException extends BaseException {
  constructor(customer_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Customer Not Found',
      name: 'CUSTOMER_NOT_FOUND',
      developerMessage: `Customer not found with Id [${customer_id}]`
    });
  }
}
