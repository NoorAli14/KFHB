import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { X_ACCESS_TOKEN } from '@common/constants';
import { ConfigurationService } from '@common/configuration/configuration.service';
@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigurationService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const b64auth: string = (request.headers[X_ACCESS_TOKEN] as string) || '';
    const [appKey, appSecret] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');
    return this.config.APP.BASIC_AUTH_KEY === appKey && this.config.APP.BASIC_AUTH_SECRET === appSecret;
  }
}
