import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    const response = context.switchToHttp().getResponse();

    /*
     * next.handle() is responsible for invoking the router handler.
     * @return handle() method returns an Observable. we can use powerful RxJS operators to further manipulate the response stream.
     *
     * pipe() method is used for chaining Observable operators.
     * map() is a rxjx/operators that emits the values from the source Observable transformed by the given project function.
     */
    return next.handle().pipe(
      map(data => {
        response.header('x-response-time', `${Date.now() - now} ms`);
        return data;
      }),
    );
  }
}
