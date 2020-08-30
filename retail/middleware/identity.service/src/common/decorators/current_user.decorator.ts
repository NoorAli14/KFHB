import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { X_USER_ID } from '@rubix/common/constants';

export const CurrentUser = createParamDecorator(
  async (data: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return { id: req.headers[X_USER_ID] };
  },
);
