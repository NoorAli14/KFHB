import { Module as RubixModule } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { CommonModule } from '@common/common.module';
// import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permissions/permissions.module';
import { ModuleModule } from './modules/modules.module';
import { UserModule } from './users/users.module';
import { InvitationModule } from './invitations/invitation.module';
// import { EvaluationModule } from './evaluation/evaluation.module';

@RubixModule({
  imports: [
    CommonModule,
    InvitationModule,
    UserModule,
    RolesModule,
    PermissionModule,
    ModuleModule,
    GraphQLGatewayModule.forRoot({
      server: {
        // ... Apollo server options
        cors: true,
      },
      gateway: {
        serviceList: [
          // These all Server values comes through service registery
          // { name: 'users', url: 'http://localhost:3020/graphql' },
          // { name: 'customers', url: 'http://localhost:3010/graphql' },
        ],
      },
    }),
  ],
})
export class ModuleV1 {}
