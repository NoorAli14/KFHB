import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { X_USER_ID, X_TENANT_ID } from '@common/constants';

export const CurrentUser = createParamDecorator(
  async (data: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return { id: req.headers[X_USER_ID], tenant_id: req.headers[X_TENANT_ID] };
  },
);
