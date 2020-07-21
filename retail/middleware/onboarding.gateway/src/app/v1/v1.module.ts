import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './identity/identity.module';
import { FaceModule } from './faces/faces.module';
import { ForensicModule } from './forensic/forensic.module';
import { OtpModule } from './otp/otp.module';
import { AccountModule } from './accounts/accounts.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    AuthModule,
    FaceModule,
    IdentityModule,
    OtpModule,
    ForensicModule,
    AccountModule,
    EvaluationModule,
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
export class V1Module {}
