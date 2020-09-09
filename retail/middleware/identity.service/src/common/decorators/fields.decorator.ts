import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { graphqlFields } from '@rubix/common/utilities';

export const Fields = createParamDecorator(
  async (data: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    return graphqlFields(ctx.getInfo());
  },
);
