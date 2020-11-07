import { HttpException } from "@nestjs/common";
interface IError {
    name: string;
    message: string;
    developerMessage?: string;
    field: string;
    value: string;
}

export class GqlException extends HttpException {
    constructor(private err: any) {
        super(null, err.exception.status);
    }

    get errors(): IError[] {
        return this.err.exception.response;
    }
    get name(): string {
        return this.err.exception.name;
    }
    get serviceName(): string {
        return this.err.serviceName;
    }
}