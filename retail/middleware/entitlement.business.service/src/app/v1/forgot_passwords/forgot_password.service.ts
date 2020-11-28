import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  GqlClientService,
  SuccessDto,
  USER_STATUSES,
} from '@common/index';
import { UserService } from '@app/v1/users/users.service';
import { User } from '@app/v1/users/user.entity';
import { NotificationsService } from '@app/v1/notifications/notifications.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly gqlClient: GqlClientService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationsService,
  ) { }

  async sendResetPasswordLink(
    input: {
      [key: string]: string;
    },
  ): Promise<SuccessDto> {
    const user: User = await this.userService.findByEmail(input.email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    } else if (user.status !== USER_STATUSES.ACTIVE) {
      throw new BadRequestException(`Invalid Request`);
    }
    const query = `query {
      result: forgotPassword(input: {email: "${user.email}"}) {
        password_reset_token
        password_reset_token_expiry
      }
    }`;

    const result: any = await this.gqlClient.send(query);
    await this.notificationService.sendResetPasswordLink(
      user.email,
      result.password_reset_token,
    );
    return {
      status: 'SUCCESS',
      expired_at: result.password_reset_token_expiry,
      message: 'Reset password link has been successfully sent.',
    };
  }

  async changePassword(
    token: string,
    input: { [key: string]: string },
  ): Promise<SuccessDto> {
    const user: any = await this.userService.findByPasswordResetToken(
      token,
    );
    if (!user) {
      throw new BadRequestException('Invalid Password Reset Token');
    } else if (user.status !== USER_STATUSES.ACTIVE) {
      throw new BadRequestException(`Invalid Request`);
    }
    const mutation = `mutation {
      changePassword(input: { 
        password_reset_token: "${token}", 
        password: "${input.password}"
      }){ id email status }
    }`;
    const result: any = await this.gqlClient.send(mutation);
    if (result?.errors) {
      throw new BadRequestException('Invalid Password Reset Token');
    }
    return {
      status: 'SUCCESS',
      message: 'Password has been successfully updated.',
    };
  }

  async checkStatus(token: string): Promise<SuccessDto> {
    const user: any = await this.userService.findByPasswordResetToken(
      token,
    );
    if (!user) {
      throw new BadRequestException('Invalid Password Reset Token');
    } else if (user.status !== USER_STATUSES.ACTIVE) {
      throw new BadRequestException(`Invalid Request`);
    }
    return {
      status:
        new Date(user.password_reset_token_expiry) > new Date()
          ? 'SUCCESS'
          : 'EXPIRED',
      expired_at: user.password_reset_token_expiry,
    };
  }
}
