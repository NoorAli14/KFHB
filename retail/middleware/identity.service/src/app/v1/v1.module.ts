import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { DataloaderModule } from '@rubix/core/dataloaders/loader.module';
import { CommonModule } from '@rubix/common/common.module';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { SessionModule } from './sessions/session.module';
import { CustomerModule } from './customers/customer.module';
import { FaceModule } from './faces/face.module';
import { DocumentModule } from './documents/document.module';
@Module({
  imports: [
    DataloaderModule,
    CustomerModule,
    FaceModule,
    SessionModule,
    DocumentModule,
    GraphQLFederationModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (configService: ConfigurationService) => ({
        debug: configService.GRAPHQL.DEBUG,
        autoSchemaFile: join(`${process.cwd()}/schema.gql`),
        playground: configService.GRAPHQL.PLAYGROUND,
        formatError: (err) => {
          console.error(`Error: ${JSON.stringify(err, null, 2)}`);
          return err;
        }
      }),
      inject: [ConfigurationService],
    }),
  ],
})
export class V1Module { }
