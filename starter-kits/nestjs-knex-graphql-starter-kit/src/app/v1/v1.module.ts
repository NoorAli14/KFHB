import { Module } from '@nestjs/common';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { Routes } from 'nest-router';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRootAsync({
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
export class V1Module {
  static Routes(): Routes {
    const routes: Routes = [
      {
        path: '/v1',
        module: V1Module,
        children: [
          {
            path: '/users',
            module: UsersModule,
          },
        ],
      },
    ];
    return routes;
  }
}
