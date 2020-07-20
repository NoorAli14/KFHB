import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { X_CORRELATION_KEY } from '@common/constants';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(data => ({
        meta: {
          'x-correlation-id': request.headers[X_CORRELATION_KEY],
          'status-code': response.statusCode,
          'response-time': `${Date.now() - now} ms`,
        },
        response: data,
      })),
    );
  }
}
