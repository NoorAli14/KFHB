import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return req.headers['x-user-id'] && req.headers['x-tenant-id']
      ? true
      : false;
  }
}
