import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, Info } from '@nestjs/graphql';
import { graphqlFields } from '@rubix/common/utilities';

export const Fields = createParamDecorator(async (data: any, context: ExecutionContext & { [key: string]: any }) => {
  const gqlContext = GqlExecutionContext.create(context);
  return graphqlFields(gqlContext.getInfo());
});
