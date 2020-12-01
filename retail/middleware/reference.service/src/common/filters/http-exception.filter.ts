import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost): void {
    if (Array.isArray(exception['response'])) {
      exception['response'].map(validationError => {
        const property: string = validationError['property'];
        if (property?.includes('_')) {
          const constraints = validationError['constraints'];
          Object.keys(constraints).map(function(constraintKey) {
            constraints[constraintKey] = constraints[constraintKey].replace(
              '_',
              ' ',
            );
          });
        }
      });
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      name: exception.name || exception.response.name,
      errors: exception.response || [],
      timestamp: new Date().toISOString(),
      path: request?.url || null,
    });
  }
}
