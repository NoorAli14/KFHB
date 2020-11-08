import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class DocumentNotFoundException extends BaseException {
    constructor(document_id?: number) {
        super(HttpStatus.NOT_FOUND, { message: `Document not found`, name: 'DOCUMENT_NOT_FOUND', developerMessage: `Document not found with ID [${document_id}]` });
    }
}