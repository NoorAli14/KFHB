import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class SentNotificationFailedException extends BaseException {
  constructor(user_id?: string) {
    super(HttpStatus.BAD_REQUEST, {
      message: `We're unable to sent notification, to the user`,
      name: 'SENT_NOTIFICATION_FAILED',
      developerMessage: `We're unable to sent notification, to the user: [${user_id}]`,
    });
  }
}
