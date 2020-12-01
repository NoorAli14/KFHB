import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlException } from '@common/exceptions';

@Catch(GqlException)
export class GqlExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GqlException.name);
    catch(exception: GqlException | any, host: ArgumentsHost): void {
        this.logger.log(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus() || 500;

        response.status(status).json({
            statusCode: status,
            name: exception.name,
            service: exception.serviceName,
            errors: exception.errors || [],
            timestamp: new Date().toISOString(),
            path: request?.url || null,
        });
    }
}
