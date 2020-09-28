import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { setContext } from '@core/index';

import {
  X_ACCESS_TOKEN,
  RedisClientService,
  ConfigurationService,
  IHEADER,
  formattedHeader,
} from '@common/index';
import { CustomersService } from '@app/v1/customers/customers.service';
import { Customer } from '@app/v1/customers/customer.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly redisService: RedisClientService,
    private readonly configService: ConfigurationService,
    private readonly customerService: CustomersService,
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
  async validate(request: Request, payload: { [key: string]: any }): Promise<Customer> {
    this.logger.log(`Start authenticating customer with ID [${payload.id}]`);
    if (!(await this.redisService.getValue(payload.id))) return null;
    const header: IHEADER = formattedHeader(payload.id, request.headers);
    setContext('HttpHeaders', header);
    const customer: Customer = await this.customerService.findOne(payload.id);
    if (!customer) throw new UnauthorizedException();
    setContext('currentUser', customer);
    return customer;
  }
}
