import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class PermissionNotFoundException extends BaseException {
  constructor(id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Not Found',
      errorCode: 'ENT-1061',
      name: 'ENT_PERMISSION_NOT_FOUND',
      developerMessage: `Permission not found, id [${id}]`,
    });
  }
}
