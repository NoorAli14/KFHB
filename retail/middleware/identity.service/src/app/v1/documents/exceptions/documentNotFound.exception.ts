import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class DocumentNotFoundException extends BaseException {
    constructor(document_id?: number) {
        super(HttpStatus.NOT_FOUND, { message: `Document not found`, errorCode: '123', name: 'SessionNotFound', developerMessage: 'Testing' },);
    }
}