import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionNotFoundException extends HttpException {
    constructor(sessionId?: number) {
        super({ message: `Session with id ${sessionId} not found`, errorCode: '123', name: 'SessionNotFound', developerMessage: 'Testing' }, HttpStatus.NOT_FOUND);
    }
}