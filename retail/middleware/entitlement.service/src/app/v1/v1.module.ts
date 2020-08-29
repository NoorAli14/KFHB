import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';

import {DataloaderModule} from "@core/dataloaders/loader.module";
import { UsersModule } from '@app/v1/users/users.module';
import { RolesModule } from '@app/v1/roles/roles.module';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { ModuleModule } from '@app/v1/modules/module.module';
import { PermissionsModule } from '@app/v1/permissions/permissions.module';
import { LoginModule } from '@app/v1/login/login.module';
import { ForgotPasswordModule } from '@app/v1/forgot-password/forgot-password.module';
import { WorkingDaysModule } from '@app/v1/working-days/working-days.module';
import { HolidaysModule } from '@app/v1/holiday/holidays.module';
import { LeavesModule } from '@app/v1/leave/leaves.module';

@Module({
  imports: [
    DataloaderModule,
    UsersModule,
    RolesModule,
    ModuleModule,
    PermissionsModule,
    LoginModule,
    ForgotPasswordModule,
    WorkingDaysModule,
    HolidaysModule,
    LeavesModule,
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
