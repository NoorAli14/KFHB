import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { X_CORRELATION_KEY } from '@rubix/common/constants';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    if (req) {
      return next.handle().pipe(
        tap(() =>
          Logger.log(
            `[${req.headers[X_CORRELATION_KEY]}] ${req.method} ${req.url} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
    } else {
      const ctx: any = GqlExecutionContext.create(context);
      const resolverName = ctx.constructorRef.name;
      const info = ctx.getInfo();
      const { req } = ctx.getContext();
      return next.handle().pipe(
        tap(() =>
          Logger.log(
            `[${req.headers[X_CORRELATION_KEY]}] ${info.parentType} "${info.fieldName}" ${Date.now() - now}ms`,
            resolverName,
          ),
        ),
      );
    }
  }
}