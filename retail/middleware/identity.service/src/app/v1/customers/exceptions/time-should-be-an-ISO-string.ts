import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class TimeShouldBeAnISOStringException extends BaseException {
  constructor(time?:string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'time should be an ISO string',
      errorCode: 'IDT-1002',
      name: 'CREATED_ON_START_AND_END_BE_PRESENT',
      developerMessage: `time(${time}) should be an ISO string`
    });
  }
}
