import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class LeaveTypeAlreadyExistException extends BaseException {
  constructor(leave_type_id?: string) {
    super(HttpStatus.CONFLICT, {
      message: 'Leave Type already exists',
      errorCode: 'ENT-1032',
      name: 'LEAVE_TYPE_ALREADY_EXIST',
      developerMessage: `Leave-Type already exists with Id [${leave_type_id}]`,
    });
  }
}
