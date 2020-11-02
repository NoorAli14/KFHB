import { UnprocessableEntityException } from "@nestjs/common";
interface IError {
    name: string;
    message: string;
    developerMessage?: string;
    field: string;
    value: string;
}
export class ValidationException extends UnprocessableEntityException {
    private __errors: IError[];
    constructor(errors: any) {
        super();
        this.__errors = [];
        for (let error of errors) {
            for (let key in error.constraints) {
                this.__errors.push({
                    name: `${error.property}_${key}`.toUpperCase(),
                    // code: error?.contexts[key]?.errorCode || null,
                    message: error.constraints[key],
                    developerMessage: error?.contexts?.[key]?.developerNote || error.constraints[key],
                    field: error.property,
                    value: error.value,
                });
            }
        }
    }

    public get errors() {
        return this.__errors;
    }
}