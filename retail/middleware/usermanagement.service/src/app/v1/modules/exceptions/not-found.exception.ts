import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class ModuleNotFoundException extends BaseException {
  constructor(id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: 'Module Not Found',
      name: 'MODULE_NOT_FOUND',
      developerMessage: `Module not found, id [${id}]`,
    });
  }
}
