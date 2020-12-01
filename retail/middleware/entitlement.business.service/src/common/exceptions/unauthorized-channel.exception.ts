import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class UnauthorizedChannelException extends BaseException {
    constructor(channel?: string) {
        super(HttpStatus.UNAUTHORIZED, {
            message: 'Invalid channel ID',
            name: 'UNAUTHORIZED_CHANNEL',
            developerMessage: `Invalid header channel ID [${channel}]`
        });
    }
}