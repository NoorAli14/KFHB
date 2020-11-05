import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
    constructor(status: number, error?: any,) {
        super(error, status);
    }
}