import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { X_CORRELATION_KEY, X_USER_ID, X_TENANT_ID } from '@common/constants';
import { formattedHeader } from '@common/utilities';
export const Header = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return formattedHeader(req.user.id, req.headers);
});
