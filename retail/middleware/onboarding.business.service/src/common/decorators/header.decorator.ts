import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { X_CORRELATION_KEY, X_USER_ID, X_TENANT_ID } from '@common/constants';
export const Header = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const headers: { [key: string]: string } = {};
  headers[X_CORRELATION_KEY] = req.headers[X_CORRELATION_KEY];
  if (req.user) headers[X_USER_ID] = req.user.id;
  headers[X_TENANT_ID] = req.headers[X_TENANT_ID];
  return headers;
});
