import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CustomersService } from '../../customers/customers.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly customerService: CustomersService) {
    super({
      usernameField: 'email',
    });
  }
}
