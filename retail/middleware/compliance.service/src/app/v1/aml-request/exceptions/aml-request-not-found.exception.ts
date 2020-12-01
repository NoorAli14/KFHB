import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/exceptions';
export class AmlRequestNotFoundException extends BaseException {
    constructor(aml_request_id?: string) {
        super(HttpStatus.NOT_FOUND, {
            message: 'AML Request Not Found',
            name: 'AML_REQUEST_NOT_FOUND',
            developerMessage: `AML Request not found with Id [${aml_request_id}]`
        });
    }
}
