import { Module, OnModuleDestroy, Inject } from '@nestjs/common';
import { KnexModule, InjectKnex, Knex } from 'nestjs-knex';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { CommonModule } from '@common/common.module';
import { UserRepository } from '@core/repository/';

@Module({
  imports: [
    CommonModule,
    KnexModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (_configService: ConfigurationService) => ({
        config: _configService.databaseConfig(),
      }),
      inject: [ConfigurationService],
    }),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoryModule implements OnModuleDestroy {
  @InjectKnex() private readonly connection: Knex;
  async onModuleDestroy() {
    await this.connection.destroy();
  }
}
