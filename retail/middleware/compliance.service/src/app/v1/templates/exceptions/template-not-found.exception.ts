import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class TemplateNotFoundException extends BaseException {
    constructor(template?: string) {
        super(HttpStatus.NOT_FOUND, {
            message: 'Template not found',
            errorCode: 'CMP-2000',
            name: 'TEMPLATE_NOT_FOUND',
            developerMessage: `Template not found with Id [${template}]`
        });
    }
}
