import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class CreatedOnStartShouldBeLessThanEndException extends BaseException {
  constructor(start?:string, end?:string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'created_on start should be less than end',
      errorCode: 'IDT-1002',
      name: 'CREATED_ON_START_AND_END_BE_PRESENT',
      developerMessage: `start(${start}) should be less than end(${end}) for filter on created_on`
    });
  }
}
