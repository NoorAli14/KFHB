import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from '../exceptions';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ValidationExceptionFilter.name);
    catch(exception: ValidationException | any, host: ArgumentsHost): void {
        this.logger.log(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            name: 'INPUT_VALIDATION_ERROR',
            errors: exception?.errors || [],
            timestamp: new Date().toISOString(),
            path: request ? request.url : null,
        });
    }
}