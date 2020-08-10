import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { DataloaderModule } from '@rubix/core/dataloaders/loader.module';

import { CommonModule } from '@rubix/common/common.module';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    DataloaderModule,
    UsersModule,
    PostModule,
    CommentsModule,
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
