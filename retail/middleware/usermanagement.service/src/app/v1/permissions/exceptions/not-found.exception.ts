import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class PermissionNotFoundException extends BaseException {
  constructor(id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Permission Not Found',
      name: 'PERMISSION_NOT_FOUND',
      developerMessage: `Permission not found, id [${id}]`,
    });
  }
}
