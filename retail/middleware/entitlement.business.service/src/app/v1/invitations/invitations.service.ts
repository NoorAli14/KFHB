import { Injectable } from '@nestjs/common';
import {
  GqlClientService,
  USER_STATUSES,
  SuccessDto,
} from '@common/index';
import { NotificationsService } from '@app/v1/notifications/notifications.service';
import { UserService } from '@app/v1/users/users.service';
import { UpdateUserDto } from '@app/v1/users/user.dto';
import { User } from '@app/v1/users/user.entity';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly gqlClient: GqlClientService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationsService,
  ) { }

  async invite(input: UpdateUserDto): Promise<User> {
    const user: User = await this.userService.create(input);
    const invitation: any = await this.userService.findOne(
      user.id,
      `{id invitation_token}`,
    );

    await this.notificationService.sendInvitationLink(
      user.email,
      invitation.invitation_token,
    );
    return user;
  }

  async acceptInvitation(
    id: string,
    input: Record<string, any>,
  ): Promise<User> {
    input.status = USER_STATUSES.ACTIVE;
    input.invitation_token = null;
    input.invitation_token_expiry = null;
    return this.userService.update(id, input);
  }

  async resendInvitationLink(
    userId: string,
  ): Promise<SuccessDto> {
    const mutation = `mutation {
      result: resetInvitationToken(id: "${userId}"){
        id
        email
        invitation_token
        invitation_token_expiry
      }
    }`;
    const invitation = await this.gqlClient.send(mutation);
    await this.notificationService.sendInvitationLink(
      invitation.email,
      invitation.invitation_token,
    );
    return {
      status: 'SUCCESS',
      message: `Congratulations! Invitation instructions has been sent to ${invitation.email}`,
      expired_at: invitation.invitation_token_expiry,
    };
  }
}
