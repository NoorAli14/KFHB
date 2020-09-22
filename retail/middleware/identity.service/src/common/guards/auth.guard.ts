import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { X_USER_ID, X_TENANT_ID } from '@rubix/common/constants';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return req.headers[X_USER_ID] && req.headers[X_TENANT_ID] ? true : false;
  }
}
