import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class TokenInvalidOrExpiredException extends BaseException {
  constructor(token?: string) {
    super(HttpStatus.NOT_ACCEPTABLE, {
      message: 'Invalid/Expired Invitation Token',
      errorCode: 'ENT-1052',
      name: 'ENT_TOKEN_INVALID_OR_EXPIRED',
      developerMessage: `Token is expited of invalid [${token}]`
    });
  }
}
