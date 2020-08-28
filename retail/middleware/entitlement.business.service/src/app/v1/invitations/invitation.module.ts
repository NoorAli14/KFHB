import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';
import { UserService } from '@app/v1/users/users.service';
import { UserModule } from '@app/v1/users/users.module';
import { NotificationModule } from '@app/v1/notifications/notification.module';
import { NotificationsService } from '@app/v1/notifications/notifications.service';

@Module({
  imports: [UserModule, NotificationModule, GqlClientModule],
  controllers: [InvitationsController],
  providers: [
    UserService,
    GqlClientService,
    NotificationsService,
    InvitationsService,
  ],
})
export class InvitationModule {}
