import { Module as RubixModule } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
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
  ];
} else {
  serviceList = [{ name: 'users', url: 'http://localhost:5020/graphql' }];
}
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
    GraphQLGatewayModule.forRoot({
      server: {
        // ... Apollo server options
        cors: true,
      },
      gateway: {
        // Note: All these values comes through service registry. For Demo purposes we hardcode service list
        serviceList: serviceList,
      },
    }),
  ],
})
export class ModuleV1 {}
