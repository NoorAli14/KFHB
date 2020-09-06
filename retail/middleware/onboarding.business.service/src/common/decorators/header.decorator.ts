import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { X_CORRELATION_KEY, X_USER_ID, X_TENANT_ID } from '@common/constants';
export const Header = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const headers: { [key: string]: string } = {};
  headers[X_CORRELATION_KEY] = req.headers[X_CORRELATION_KEY];
  if (req.user) headers[X_USER_ID] = req.user.id;
  headers[X_TENANT_ID] = '958CA3EF-608E-4489-A0C8-E4D40F2E10D5';
  return headers;
});
