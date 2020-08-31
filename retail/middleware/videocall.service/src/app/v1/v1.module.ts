import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { DataloaderModule } from '@core/dataloaders/loader.module';
import { RepositoryModule } from '@core/repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
    DataloaderModule,
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
