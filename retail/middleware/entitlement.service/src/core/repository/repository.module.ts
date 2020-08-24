import { Module, OnModuleDestroy } from '@nestjs/common';
import { KnexModule, InjectKnex, Knex } from 'nestjs-knex';
import { CommonModule } from '@common/common.module';
import { DBConfigurationService } from '@common/configuration/dbconfiguration.service';
import {HolidayRepository, LeaveRepository, UserRepository, WorkingDaysRepository} from '@core/repository/';
import {RoleRepository} from "@core/repository/role.repository";
import {UserRoleRepository} from "@core/repository/user-role.repository";
import {ModuleRepository} from "@core/repository/module.repository";
import {RoleModuleRepository} from "@core/repository/role-module.repository";
import {RoleModulePermissionRepository} from "@core/repository/role-module-permission.repository";
import {PermissionRepository} from "@core/repository/permission.repository";
@Module({
  imports: [
    CommonModule,
    KnexModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (_configService: DBConfigurationService) => ({
        config: _configService.databaseConfig(),
      }),
      inject: [DBConfigurationService],
    }),
  ],
  providers: [UserRepository,
    RoleRepository,
    UserRoleRepository,
    ModuleRepository,
    RoleModuleRepository,
    PermissionRepository,
    RoleModulePermissionRepository,
    WorkingDaysRepository,
    HolidayRepository,
    LeaveRepository],
  exports: [UserRepository,
    RoleRepository,
    UserRoleRepository,
    ModuleRepository,
    RoleModuleRepository,
    PermissionRepository,
    RoleModulePermissionRepository,
    WorkingDaysRepository,
    HolidayRepository,
    LeaveRepository],
})
export class RepositoryModule implements OnModuleDestroy {
  @InjectKnex() private readonly connection: Knex;
  async onModuleDestroy(): Promise<any> {
    await this.connection.destroy();
  }
}
