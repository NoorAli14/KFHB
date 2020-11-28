import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from '@common/exceptions';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ValidationExceptionFilter.name);
    catch(exception: ValidationException | any, host: ArgumentsHost): void {
        if (Array.isArray(exception['__errors'])) {
            exception['__errors'].map(validationError => {
                const property: string = validationError['property'];
                if (property?.includes('_')) {
                    const constraints = validationError['constraints'];
                    Object.keys(constraints).map(function (constraintKey) {
                        constraints[constraintKey] = constraints[constraintKey].replace('_', ' ');
                    });
                }
            });
        }
        this.logger.log(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            name: 'INPUT_VALIDATION_ERROR',
            errors: exception.errors || [],
            timestamp: new Date().toISOString(),
            path: request?.url || null,
        });
    }
}
