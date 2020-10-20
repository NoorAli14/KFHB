import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {PAGINATION_PARAMS} from '@rubix/common/constants';

export const QueryParamsCustomer = createParamDecorator(
  async (data: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let created_on = {};
    try {
        created_on = JSON.parse(req.query["created_on"]);
    } finally {
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
            created_on_start: created_on["start"],
            created_on_end: created_on["end"],
        };
    }
  },
);
