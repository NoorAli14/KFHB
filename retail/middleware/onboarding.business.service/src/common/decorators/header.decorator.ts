import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { formattedHeader } from '@common/utilities';
export const Header = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return formattedHeader(req);
});
