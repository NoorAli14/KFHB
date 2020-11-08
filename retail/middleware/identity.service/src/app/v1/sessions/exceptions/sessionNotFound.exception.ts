import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionNotFoundException extends HttpException {
    constructor(sessionId?: string) {
        super({ message: `Session not found`, name: 'SESSION_NOT_FOUND', developerMessage: `Session not found with id [${sessionId}]` }, HttpStatus.NOT_FOUND);
    }
}