import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { UserService } from '@app/v1/users/users.service';
import { UserModule } from '@app/v1/users/users.module';
import { ForgotPasswordController } from './forgot_password.controller';
import { ForgotPasswordService } from './forgot_password.service';
import { NotificationModule } from '@app/v1/notifications/notification.module';
import { NotificationsService } from '@app/v1/notifications/notifications.service';

@Module({
  imports: [UserModule, GqlClientModule, NotificationModule],
  controllers: [ForgotPasswordController],
  providers: [
    ForgotPasswordController,
    ForgotPasswordService,
    UserService,
    GqlClientService,
    NotificationsService,
  ],
})
export class ForgotPasswordModule {}
