import {
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { X_CORRELATION_KEY } from '@common/index';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    /*
     * next.handle() is responsible for invoking the router handler.
     * @return handle() method returns an Observable. we can use powerful RxJS operators to further manipulate the response stream.
     *
     * pipe() method is used for chaining Observable operators.
     * tap() is a rxjx/operators. Used to maintain a side effect that is tied to the emission of the observable but not directly tied to its result.
     */
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            ` [${request.get(X_CORRELATION_KEY)}] [${Date.now() - now}ms]`,
            context.getClass().name,
          ),
        ),
      );
  }
}
