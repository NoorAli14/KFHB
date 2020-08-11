import { Module } from '@nestjs/common';
import { join } from 'path';
import { TemplateQuestionsModule } from './template-questions/template-questions.module';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { TemplateResponsesModule } from './template-responses/template-responses.module';
import { OptionsModule } from './options/options.module';
import { QuestionsModule } from './questions/questions.module';
import { SectionsModule } from './sections/sections.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [
    TemplateQuestionsModule,
    TemplateResponsesModule,
    TemplatesModule,
    OptionsModule,
    QuestionsModule,
    SectionsModule,
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
