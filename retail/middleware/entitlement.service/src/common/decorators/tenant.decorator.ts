import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {HEADER_NAMES} from '@common/constants';

export const Tenant = createParamDecorator(
  async (data: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return { id: req.get(HEADER_NAMES.X_TENANT_ID) };
  },
);
