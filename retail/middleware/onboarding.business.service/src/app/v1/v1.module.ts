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
  X_CORRELATION_KEY,
  RegistryService,
} from '@common/index';

import { AuthModule } from './auth/auth.module';
import { ComplianceModule } from './compliances/compliances.module';
import { OtpModule } from './otp/otp.module';
import { SessionModule } from './sessions/session.module';
import { DocumentModule } from './documents/document.module';
import { AttachmentModule } from './attachments/attachment.module';

import { UserModule } from './users/user.module';
import { AmlModule } from './aml/aml.module';

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
class BuildServiceModule {}

@RubixModule({
  imports: [
    CommonModule,
    GqlClientModule,
    AuthModule,
    SessionModule,
    DocumentModule,
    OtpModule,
    UserModule,
    ComplianceModule,
    AmlModule,
    AttachmentModule,
    GraphQLGatewayModule.forRootAsync({
      imports: [BuildServiceModule],
      useFactory: async (schema: RegistryService) => ({
        gateway: {
          // Note: All these values comes through service registry. For Demo purposes we hardcode service list
          serviceList: schema.services.map(({ name, url }) => ({ name, url })),
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
      inject: [RegistryService, GATEWAY_BUILD_SERVICE],
    }),
    RedisModule.forRootAsync({
      imports: [CommonModule],
      useFactory: (_config: ConfigurationService) => _config.REDIS_CONNECTION,
      inject: [ConfigurationService],
    }),
  ],
})
export class ModuleV1 {}
