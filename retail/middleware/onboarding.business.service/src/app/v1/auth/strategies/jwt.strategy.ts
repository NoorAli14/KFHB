import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  X_ACCESS_TOKEN,
  RedisClientService,
  ConfigurationService,
} from '@common/index';
import { UserService } from '@app/v1/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly redisService: RedisClientService,
    private readonly configService: ConfigurationService,
    private readonly customerService: UserService,
  ) {
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
      ignoreExpiration: configService.JWT.IGNORE_EXPIRY,
      secretOrKey: configService.JWT.SECRET,
    });
  }

  async validate(payload: any) {
    if (!(await this.redisService.getValue(payload.id))) return null;
    return this.customerService.findOne(payload.id);
  }
}
