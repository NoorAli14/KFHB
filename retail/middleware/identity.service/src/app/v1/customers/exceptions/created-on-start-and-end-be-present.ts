import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class CreatedOnStartAndEndBePresentException extends BaseException {
  constructor(start?:string, end?:string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'start and end both should be present for filter on created_on',
      errorCode: 'IDT-1001',
      name: 'CREATED_ON_START_AND_END_BE_PRESENT',
      developerMessage: `start(${start}) and end(${end}) both should be present for filter on created_on`
    });
  }
}
