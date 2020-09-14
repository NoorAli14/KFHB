import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  GqlClientService,
  IHEADER,
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
  ) {}

  async sendResetPasswordLink(
    header: IHEADER,
    input: {
      [key: string]: string;
    },
  ): Promise<SuccessDto> {
    const user: User = await this.userService.findByEmail(header, input.email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    } else if (user.status !== USER_STATUSES.ACTIVE) {
      throw new BadRequestException(`Invalid Request`);
    }
    const query: string = `query {
      result: forgotPassword(input: {email: "${user.email}"}) {
        password_reset_token
        password_reset_token_expiry
      }
    }`;

    const result: any = await this.gqlClient.setHeaders(header).send(query);
    await this.notificationService.sendResetPasswordLink(
      header,
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
    header: IHEADER,
    token: string,
    input: { [key: string]: string },
  ): Promise<SuccessDto> {
    const user: any = await this.userService.findByPasswordResetToken(
      header,
      token,
    );
    if (!user) {
      throw new BadRequestException('Invalid Password Reset Token');
    } else if (user.status !== USER_STATUSES.ACTIVE) {
      throw new BadRequestException(`Invalid Request`);
    }
    const mutation: string = `mutation {
      changePassword(input: { 
        password_reset_token: "${token}", 
        password: "${input.password}"
      }){ id email status }
    }`;
    const result: any = await this.gqlClient.setHeaders(header).send(mutation);
    if (result?.errors) {
      throw new BadRequestException('Invalid Password Reset Token');
    }
    return {
      status: 'SUCCESS',
      message: 'Password has been successfully updated.',
    };
  }

  async checkStatus(header: IHEADER, token: string): Promise<SuccessDto> {
    const user: any = await this.userService.findByPasswordResetToken(
      header,
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
