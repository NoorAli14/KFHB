import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './identity/identity.module';
import { FaceModule } from './faces/faces.module';
import { ForensicModule } from './forensic/forensic.module';
import { OtpModule } from './otp/otp.module';
import { AccountModule } from './accounts/accounts.module';
import { EvaluationModule } from './evaluation/evaluation.module';
@Module({
  imports: [
    AuthModule,
    FaceModule,
    IdentityModule,
    OtpModule,
    ForensicModule,
    AccountModule,
    EvaluationModule,
  ],
})
export class V1Module {}
