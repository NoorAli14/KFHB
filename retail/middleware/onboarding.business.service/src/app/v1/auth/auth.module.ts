import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CustomerModule } from '@app/v1/customers/customer.module';
import { CustomersService } from '@app/v1/customers/customers.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  RedisClientService,
  GqlClientService,
  GqlClientModule,
  CommonModule,
  ConfigurationService,
} from '@common/index';

@Module({
  imports: [
    CommonModule,
    CustomerModule,
    GqlClientModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [CommonModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.JWT.SECRET,
        algorithm: configService.JWT.ALGORITHM
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    CustomersService,
    AuthService,
    GqlClientService,
    LocalStrategy,
    ConfigurationService,
    JwtStrategy,
    RedisClientService,
  ],
  exports: [PassportModule, LocalStrategy, AuthService],
})
export class AuthModule { }
