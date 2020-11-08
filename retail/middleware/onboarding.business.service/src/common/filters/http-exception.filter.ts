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
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    if (exception?.response?.name && exception?.response?.errors) {
      response.status(status).json({
        statusCode: status,
        name: exception.response.name,
        errors: exception.response.errors || [],
        timestamp: new Date().toISOString(),
        path: request?.url || null,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        name: exception.name || exception.response.name,
        errors: exception.response || [],
        timestamp: new Date().toISOString(),
        path: request?.url || null,
      });
    }

  }
}
