import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {PAGINATION_PARAMS} from '@rubix/common/constants';

export const QueryParams = createParamDecorator(
  async (data: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    console.log("/////////////////////////QueryParams///////////////////////////");
    console.log(req.query);
    return { page: req.query[PAGINATION_PARAMS.PAGE], limit: req.query[PAGINATION_PARAMS.PER_PAGE] };
  },
);
