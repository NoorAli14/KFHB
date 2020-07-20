import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    HealthModule,
    GraphQLGatewayModule.forRoot({
      server: {
        // ... Apollo server options
        cors: true,
      },
      gateway: {
        serviceList: [
          { name: 'users', url: 'http://localhost:3020/graphql' },
          { name: 'customers', url: 'http://localhost:3010/graphql' },
        ],
      },
    }),
  ],
})
export class AppModule {}
