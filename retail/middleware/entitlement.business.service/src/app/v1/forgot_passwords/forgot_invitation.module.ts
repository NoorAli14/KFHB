import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './forgot_invitations.controller';
import { ForgotPasswordService } from './forgot_invitation.service';
@Module({
  imports: [],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordController, ForgotPasswordService],
})
export class ForgotPasswordModule {}
