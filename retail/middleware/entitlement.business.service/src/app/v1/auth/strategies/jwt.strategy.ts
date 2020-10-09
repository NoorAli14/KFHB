import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  X_ACCESS_TOKEN,
  RedisClientService,
  ConfigurationService,
  IHEADER,
  formattedHeader,
} from '@common/index';
import { UserService } from '@app/v1/users/users.service';
import { User } from '@app/v1/users/user.entity';
import { setContext } from '@core/index';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly redisService: RedisClientService,
    private readonly configService: ConfigurationService,
    private readonly userService: UserService,
  ) {
    // passReqToCallback allows to have the request in the validate() function
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return (
            (request?.cookies?.[X_ACCESS_TOKEN] as string) ||
            (request?.headers?.[X_ACCESS_TOKEN] as string) ||
            (request?.query?.[X_ACCESS_TOKEN] as string)
          );
        },
      ]),
      passReqToCallback: true,
      ignoreExpiration: configService.JWT.IGNORE_EXPIRY,
      secretOrKey: configService.JWT.SECRET,
    });
  }

  setPermissions(modules: any[], track: string[]): string[] {
    return modules.reduce((accumulator, module) => {
      let result = [];
      if (module.slug)
        result = module.permissions.map(p => `${p.record_type}:${module.slug}`)
      if (module.sub_modules)
        result = this.setPermissions(module.sub_modules, result);
      return [...result, ...accumulator];
    }, track);
  }
  /**
   * Function to check that a given token is valid
   * @param request
   * @param payload Payload info
   * @returns {Promise<User>}
   */
  async validate(request: any, payload: Record<string, string>): Promise<User> {
    this.logger.log(`Start authenticating with user ID with [${payload.id}]`);
    // const user = await this.redisService.getUserProfile(payload.id);
    if (!(await this.redisService.getValue(payload.id))) return null;
    const header: IHEADER = formattedHeader(request, payload.id);
    setContext('HttpHeaders', header);
    const user: User = await this.userService.findOne(payload.id);
    if (!user) throw new UnauthorizedException();
    request.permissions = this.setPermissions(user.modules, []);;
    setContext('currentUser', user);
    return user;
  }
}
