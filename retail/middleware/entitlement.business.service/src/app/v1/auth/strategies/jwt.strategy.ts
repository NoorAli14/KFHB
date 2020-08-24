import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { UserService } from '@app/v1/users/users.service';
import { X_ACCESS_TOKEN } from '@common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly userService: UserService,
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
    return this.userService.findOne(payload.id);
  }
}
