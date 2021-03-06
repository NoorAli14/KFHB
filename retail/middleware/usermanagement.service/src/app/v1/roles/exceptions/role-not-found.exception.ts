import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class RoleNotFoundException extends BaseException {
  constructor(id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Role not found',
      name: 'ROLE_NOT_FOUND',
      developerMessage: `Role not found, id [${id}]`,
    });
  }
}
