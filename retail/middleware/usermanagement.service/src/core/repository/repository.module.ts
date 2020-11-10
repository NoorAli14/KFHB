import { Module, OnModuleDestroy } from '@nestjs/common';
import { KnexModule, InjectKnex, Knex } from 'nestjs-knex';
import { CommonModule } from '@common/common.module';
import { DBConfigurationService } from '@common/configuration/dbconfiguration.service';
import {
  HolidayRepository,
  LeaveRepository,
  UserRepository,
  WorkingDaysRepository,
} from '@core/repository/';
import { RoleRepository } from '@core/repository/role.repository';
import { ModuleRepository } from '@core/repository/module.repository';
import { PermissionRepository } from '@core/repository/permission.repository';
import { LeaveTypeRepository } from '@core/repository/leave_type.repository';

const repos: any = [
  UserRepository,
  RoleRepository,
  ModuleRepository,
  PermissionRepository,
  WorkingDaysRepository,
  HolidayRepository,
  LeaveRepository,
  LeaveTypeRepository,
];

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
  providers: [...repos],
  exports: [...repos],
})
export class RepositoryModule implements OnModuleDestroy {
  @InjectKnex() private readonly connection: Knex;
  async onModuleDestroy(): Promise<any> {
    await this.connection.destroy();
  }
}
