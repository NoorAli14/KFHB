import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from '@app/v1/users/users.service';
import { UserModule } from '@app/v1/users/users.module';

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
import {SystemAuditLogService} from "@app/v1/system-audit-log/system-audit-log.service";

@Module({
  imports: [
    CommonModule,
    UserModule,
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
    UserService,
    AuthService,
    GqlClientService,
    LocalStrategy,
    ConfigurationService,
    JwtStrategy,
    RedisClientService,
    SystemAuditLogService,
  ],
  exports: [PassportModule, LocalStrategy, AuthService],
})
export class AuthModule {}
