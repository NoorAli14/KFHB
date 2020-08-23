import { Module, OnModuleDestroy } from '@nestjs/common';
import { KnexModule, InjectKnex, Knex } from 'nestjs-knex';
import { CommonModule } from '@rubix/common/common.module';
import { DBConfigurationService } from '@rubix/common/configuration/dbconfiguration.service';
import { SessionRepository } from '@rubix/core/repository/';
const repositories: any = [SessionRepository];

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
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule implements OnModuleDestroy {
  @InjectKnex() private readonly connection: Knex;
  async onModuleDestroy(): Promise<any> {
    await this.connection.destroy();
  }
}
