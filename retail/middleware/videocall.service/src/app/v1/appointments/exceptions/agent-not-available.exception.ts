import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AgentNotAvailableException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.NOT_FOUND, {
      message: `We're unable to create appointment, because agents ia not available`,
      errorCode: 'VC-1062',
      name: 'AGENT_NOT_AVAILABLE',
      developerMessage: `We're unable to create appointment for user with id: [${user_id}]`,
    });
  }
}
