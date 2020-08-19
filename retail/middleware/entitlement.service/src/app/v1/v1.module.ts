import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import {APP_INTERCEPTOR} from "@nestjs/core";
import { DataLoaderInterceptor } from 'nestjs-graphql-dataloader'
import { join } from 'path';

import { UsersModule } from "@app/v1/users/users.module";
import { RolesModule } from "@app/v1/roles/roles.module";
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { UserRolesModule } from "@app/v1/user-roles/user-roles.module";
import { ModuleModule } from "@app/v1/modules/module.module";
import { RoleModulesModule } from "@app/v1/role-modules/role-modules.module";
import { RoleModulePermissionsModule } from "@app/v1/role-module-permissions/role-module-permissions.module";
import { PermissionsModule } from "@app/v1/permissions/permissions.module";
import {LoginModule} from "@app/v1/login/login.module";
import {ForgotPasswordModule} from "@app/v1/forgot-password/forgot-password.module";
import {WorkingDaysModule} from "@app/v1/working-days/working-days.module";

@Module({
  imports: [
    UsersModule,
    RolesModule,
    UserRolesModule,
    ModuleModule,
    RoleModulesModule,
    PermissionsModule,
    RoleModulePermissionsModule,
    LoginModule,
    ForgotPasswordModule,
    WorkingDaysModule,
    GraphQLFederationModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (configService: ConfigurationService) => ({
        debug: configService.GRAPHQL.DEBUG,
        autoSchemaFile: join(`${process.cwd()}/schema.gql`),
        playground: configService.GRAPHQL.PLAYGROUND,
      }),
      inject: [ConfigurationService],
    }),
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: DataLoaderInterceptor,
  },
  ]
})
export class V1Module {}
