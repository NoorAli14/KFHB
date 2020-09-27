import { Module as RubixModule } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { RedisModule } from 'nestjs-redis';

import {
  CommonModule,
  GqlClientModule,
  ConfigurationService,
  X_USER_ID,
  X_TENANT_ID,
  iSERVICE,
  X_CORRELATION_KEY,
} from '@common/index';

import { AuthModule } from './auth/auth.module';
import { ComplianceModule } from './compliances/compliances.module';
import { OtpModule } from './otp/otp.module';
import { SessionModule } from './sessions/session.module';
import { AttachmentModule } from './attachments/attachment.module';
import { UserModule } from './users/user.module';
import { AmlModule } from './aml/aml.module';

let services: iSERVICE[];
if (process.env.NODE_ENV === 'production') {
  services = [
    { name: 'identity', url: 'http://retail_identity:4010/graphql' },
    { name: 'compliance', url: 'http://retail_compliance:5010/graphql' },
    { name: 'notifications', url: 'http://retail_notification:5030/graphql' },
    { name: 'users', url: 'http://retail_user_management:5020/graphql' }
  ];
} else {
  services = [
    { name: 'notification', url: 'http://localhost:5030/graphql' },
    { name: 'identity', url: 'http://localhost:4010/graphql' },
    { name: 'compliance', url: 'http://localhost:5010/graphql' },
    { name: 'users', url: 'http://localhost:5020/graphql' },

  ];
}
class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const { userId, tenantId, correlationId } = context;
    request.http.headers.set(X_USER_ID, userId);
    request.http.headers.set(X_TENANT_ID, tenantId);
    request.http.headers.set(X_CORRELATION_KEY, correlationId);
  }
}

@RubixModule({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: AuthenticatedDataSource => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule { }

@RubixModule({
  imports: [
    CommonModule,
    GqlClientModule,
    AuthModule,
    SessionModule,
    AttachmentModule,
    OtpModule,
    UserModule,
    ComplianceModule,
    AmlModule,
    GraphQLGatewayModule.forRootAsync({
      imports: [BuildServiceModule],
      useFactory: async () => ({
        gateway: {
          // Note: All these values comes through service registry. For Demo purposes we hardcode service list
          serviceList: services,
        },
        server: {
          context: ({ req }) => ({
            userId: req.headers[X_USER_ID],
            tenantId: req.headers[X_TENANT_ID],
            correlationId: req.headers[X_CORRELATION_KEY],
          }),
          // ... Apollo server options
          cors: true,
        },
      }),
      inject: [GATEWAY_BUILD_SERVICE],
    }),
    RedisModule.forRootAsync({
      imports: [CommonModule],
      useFactory: (_config: ConfigurationService) => _config.REDIS_CONNECTION,
      inject: [ConfigurationService],
    }),
  ],
})
export class ModuleV1 { }
