import { Module } from '@nestjs/common';
import { UserService } from '@app/v1/users/users.service';
import { UserModule } from '@app/v1/users/users.module';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';
import { ForgotPasswordController } from './forgot_password.controller';
import { ForgotPasswordService } from './forgot_password.service';

@Module({
  imports: [UserModule, GqlClientModule],
  controllers: [ForgotPasswordController],
  providers: [
    ForgotPasswordController,
    ForgotPasswordService,
    UserService,
    GqlClientService,
  ],
})
export class ForgotPasswordModule {}
