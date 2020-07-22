import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './identity/identity.module';
import { FaceModule } from './faces/faces.module';
import { ForensicModule } from './forensic/forensic.module';
import { OtpModule } from './otp/otp.module';
import { AccountModule } from './accounts/accounts.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { CommonModule } from '@common/common.module';
@Module({
  imports: [
    CommonModule,
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
        serviceList: [ // These all Server values comes through service registery
          { name: 'users', url: 'http://localhost:3020/graphql' },
          { name: 'customers', url: 'http://localhost:3010/graphql' },
        ],
      },
    }),
  ],
})
export class V1Module {}
