import { Module as RubixModule } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { CommonModule } from '@common/common.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permissions/permissions.module';
import { ModuleModule } from './modules/modules.module';
import { UserModule } from './users/users.module';
import { InvitationModule } from './invitations/invitation.module';
import { ForgotPasswordModule } from './forgot_passwords/forgot_password.module';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';

let serviceList: any = [];
if (process.env.NODE_ENV === 'production') {
  serviceList = [
    { name: 'users', url: 'http://user_management_service:5020/graphql' },
    { name: 'notifications', url: 'http://template_service:5030/graphql' },
  ];
} else {
  serviceList = [
    { name: 'users', url: 'http://localhost:5020/graphql' },
    { name: 'notifications', url: 'http://localhost:5030/graphql' },
  ];
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const { userId, tenantId } = context;
    request.http.headers.set('x-user-id', userId);
    request.http.headers.set('x-tenant-id', tenantId);
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
    InvitationModule,
    UserModule,
    ForgotPasswordModule,
    RolesModule,
    ModuleModule,
    PermissionModule,
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          // Note: All these values comes through service registry. For Demo purposes we hardcode service list
          serviceList: serviceList,
        },
        server: {
          context: ({ req }) => ({
            userId: req.headers['x-user-id'],
            tenantId: req.headers['x-tenant-id'],
          }),
          // ... Apollo server options
          cors: true,
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class ModuleV1 {}
