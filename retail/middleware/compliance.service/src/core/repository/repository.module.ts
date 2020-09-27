import { Module, OnModuleDestroy } from '@nestjs/common';
import { KnexModule, InjectKnex, Knex } from 'nestjs-knex';
import { CommonModule } from '@common/common.module';
import { DBConfigurationService } from '@common/configuration/dbconfiguration.service';
import {
  TemplateRepository,
  SectionRepository,
  QuestionRepository,
  OptionRepository,
  TemplateQuestionsRepository,
  TemplateResponsesRepository,
  AmlRequestRepository,
  AmlResponseRepository,
} from '.';

const repositories = [
  TemplateRepository,
  SectionRepository,
  QuestionRepository,
  OptionRepository,
  TemplateQuestionsRepository,
  TemplateResponsesRepository,
  AmlRequestRepository,
  AmlResponseRepository,
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
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule implements OnModuleDestroy {
  @InjectKnex() private readonly connection: Knex;
  async onModuleDestroy(): Promise<any> {
    await this.connection.destroy();
  }
}
