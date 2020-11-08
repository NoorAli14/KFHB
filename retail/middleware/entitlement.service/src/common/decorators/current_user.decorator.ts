import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HEADER_NAMES } from '@common/constants';

export const CurrentUser = createParamDecorator(
  async (data: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return {
      id: req.headers[HEADER_NAMES.X_USER_ID],
      tenant_id: req.headers[HEADER_NAMES.X_TENANT_ID],
      entity_id: req.headers[HEADER_NAMES.X_ENTITY_ID],
    };
  },
);
