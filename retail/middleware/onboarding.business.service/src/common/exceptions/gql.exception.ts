import { HttpException } from "@nestjs/common";
interface IError {
    name: string;
    message: string;
    developerMessage?: string;
    field?: string;
    value?: string;
}

export class GqlException extends HttpException {
    constructor(private err: any) {
        super(null, err.exception.status);
    }

    get errors(): IError[] {
        if (this.err.exception?.name === 'ConnectionError') {
            return [{
                name: this.err.exception?.name,
                message: `Database connectivity error`,
                developerMessage: this.err.exception.originalError.message
            }]
        }
        return this.err.exception.response;
    }
    get name(): string {
        return this.err.exception?.name || this.err.exception?.code || this.err.exception?.response?.code;
    }
    get serviceName(): string {
        return this.err.serviceName;
    }
}