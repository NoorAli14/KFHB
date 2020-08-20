import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from '@app/v1/users/users.service';
import { UserModule } from '@app/v1/users/users.module';

import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';

import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
        signOptions: {
          expiresIn: configService.JWT.EXPIRY,
        },
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
  ],
  exports: [PassportModule, LocalStrategy, AuthService],
})
export class AuthModule {}
