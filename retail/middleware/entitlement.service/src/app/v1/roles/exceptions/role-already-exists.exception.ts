import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class RoleAlreadyExistsException extends BaseException {
  constructor(roleName?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: 'Role with this name already exists',
      name: 'ROLE_ALREADY_EXISTS',
      developerMessage: `Role with this name already exists, RoleName [${roleName}]`,
    });
  }
}
