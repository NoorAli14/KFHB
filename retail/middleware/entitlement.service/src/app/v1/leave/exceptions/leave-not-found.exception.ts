import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class LeaveNotFoundException extends BaseException {
  constructor(leave_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Leave Not Found',
      name: 'LEAVE_NOT_FOUND',
      developerMessage: `Leave not found with Id [${leave_id}]`,
    });
  }
}
