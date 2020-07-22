import { Module } from '@nestjs/common';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
import {UserRolesModule} from "@app/v1/user-roles/user-roles.module";
import {ModuleModule} from "@app/v1/modules/module.module";
import {RoleModulesModule} from "@app/v1/role-modules/role-modules.module";
import {RoleModulePermissionsModule} from "@app/v1/role-module-permissions/role-module-permissions.module";
import {PermissionsModule} from "@app/v1/permissions/permissions.module";

@Module({
  imports: [
    UsersModule,
    RolesModule,
    UserRolesModule,
    ModuleModule,
    RoleModulesModule,
    PermissionsModule,
    RoleModulePermissionsModule,
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
})
export class V1Module {}
