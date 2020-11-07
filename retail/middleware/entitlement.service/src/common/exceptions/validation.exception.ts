import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class ValidationException extends BaseException {
  constructor(errors: any) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, errors);
    this.name = 'INPUT_VALIDATION_ERROR';
  }
}
