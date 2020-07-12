import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { Routes } from 'nest-router';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [UsersModule, GraphQLModule.forRoot({})],
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
