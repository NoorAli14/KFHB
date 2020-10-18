import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {PAGINATION_PARAMS} from '@rubix/common/constants';

export const CustomerQueryParams = createParamDecorator(
  async (data: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return {
        page: req.query[PAGINATION_PARAMS.PAGE],
        limit: req.query[PAGINATION_PARAMS.LIMIT],
        national_id_no: req.query[PAGINATION_PARAMS.NATIONAL_ID_NO],
        gender: req.query[PAGINATION_PARAMS.GENDER],
        nationality: req.query[PAGINATION_PARAMS.NATIONALITY],
        first_name: req.query[PAGINATION_PARAMS.FIRST_NAME],
        last_name: req.query[PAGINATION_PARAMS.LAST_NAME],
        status: req.query[PAGINATION_PARAMS.STATUS],
        contact_no: req.query[PAGINATION_PARAMS.CONTACT_NO],
        email: req.query[PAGINATION_PARAMS.EMAIL],
        created_on_start: req.query[PAGINATION_PARAMS.CREATED_ON_START],
        created_on_end: req.query[PAGINATION_PARAMS.CREATED_ON_END],
    };
  },
);
