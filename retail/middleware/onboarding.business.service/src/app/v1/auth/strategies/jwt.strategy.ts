import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { setContext } from '@core/index';

import { X_ACCESS_TOKEN, RedisClientService, ConfigurationService, formattedHeader } from '@common/index';
import { CustomersService } from '@app/v1/customers/customers.service';
import { Customer } from '@app/v1/customers/customer.entity';
import { UserService } from '../../users/users.service';
import { User } from '../../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly redisService: RedisClientService,
    private readonly configService: ConfigurationService,
    private readonly customerService: CustomersService,
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
      if (module.slug) result = module.permissions.map(p => `${p.record_type}:${module.slug}`);
      if (module.sub_modules) result = this.setPermissions(module.sub_modules, result);
      return [...result, ...accumulator];
    }, track);
  }

  /**
   * Function to check that a given token is valid
   * @param request
   * @param payload Payload info
   * @returns {Promise<any>}
   */
  async validate(request: any, payload: { [key: string]: any }): Promise<Customer | User> {
    this.logger.log(`Start authenticating customer with ID [${payload.id}]`);
    if (!(await this.redisService.getValue(payload.id))) return;

    setContext('HttpHeaders', formattedHeader(request, payload.id));
    const customer: any = await this.findAuthUser(payload);

    if (!customer) throw new UnauthorizedException();
    if (customer?.modules && payload.type != 'customer')
      request.permissions = this.setPermissions(customer.modules, []);
    request.userType = payload.type;
    setContext('currentUser', customer);
    return customer;
  }

  async findAuthUser(payload: { [key: string]: any }): Promise<Customer | User> {
    return payload.type === 'customer'
      ? this.customerService.findOne(payload.id)
      : this.userService.findOne(payload.id);
  }
}
