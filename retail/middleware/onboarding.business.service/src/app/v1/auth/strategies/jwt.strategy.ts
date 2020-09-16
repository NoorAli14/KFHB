import { Injectable, Logger } from '@nestjs/common';
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

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly redisService: RedisClientService,
    private readonly configService: ConfigurationService,
    private readonly customerService: UserService,
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

  /**
   * Function to check that a given token is valid
   * @param request
   * @param payload Payload info
   * @returns {Promise<any>}
   */
  async validate(request: Request, payload: any): Promise<User> {
    this.logger.log(`Start authenticating customer with ID [${payload.id}]`);
    if (!(await this.redisService.getValue(payload.id))) return null;
    const header: IHEADER = formattedHeader(payload.id, request.headers);
    return this.customerService.findOne(header, payload.id);
  }
}
