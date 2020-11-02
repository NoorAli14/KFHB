import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class LeaveTypeNotFoundException extends BaseException {
  constructor(leave_type_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Leave Type Not Found',
      errorCode: 'ENT-1031',
      name: 'LEAVE_TYPE_NOT_FOUND',
      developerMessage: `Leave-Type not found with Id [${leave_type_id}]`,
    });
  }
}
