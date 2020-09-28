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
} from '@common/index';

import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permissions/permissions.module';
import { ModuleModule } from './modules/modules.module';
import { UserModule } from './users/users.module';
import { InvitationModule } from './invitations/invitation.module';
import { ForgotPasswordModule } from './forgot_passwords/forgot_password.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { WorkingDayModule } from './working-days/working-day.module';
import { HolidayModule } from './holidays/holiday.module';
import { LeaveModule } from './leaves/leave.module';
import { LeaveTypeModule } from './leave-types/leave-type.module';

import { RegistryService } from '@common/services'


// let services: iSERVICE[];
//   if (process.env.NODE_ENV === 'production') {
//     services = [
//       { name: 'users', url: 'http://user_management_service:5020/graphql' },
//       { name: 'notifications', url: 'http://notification_service:5030/graphql' },
//     ];
//   }  else{
//    services = [
//     { name: 'users', url: 'http://localhost:5020/graphql' },
//     { name: 'notifications', url: 'http://localhost:5030/graphql' },
//   ];
// }
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
        return ({ url }): AuthenticatedDataSource => new AuthenticatedDataSource({ url });
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
    InvitationModule,
    UserModule,
    ForgotPasswordModule,
    RolesModule,
    ModuleModule,
    PermissionModule,
    OnboardingModule,
    WorkingDayModule,
    HolidayModule,
    LeaveTypeModule,
    LeaveModule,
    GraphQLGatewayModule.forRootAsync({
      imports: [CommonModule, BuildServiceModule],
      useFactory: async (schema: RegistryService) => ({
        gateway: {
          // Note: All these values comes through service registry. For Demo purposes we hardcode service list
          serviceList: schema.list().map(({ name, url }) => ({ name, url })),
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
export class ModuleV1 { }
