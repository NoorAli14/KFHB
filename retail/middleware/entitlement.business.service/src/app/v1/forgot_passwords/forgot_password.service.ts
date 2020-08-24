import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '@app/v1/users/users.service';
import { SuccessDto } from '@common/dtos/';
import { User } from '@app/v1/users/user.entity';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly gqlClient: GqlClientService,
    private readonly userService: UserService,
  ) {}

  async sendResetPasswordLink(input: {
    [key: string]: string;
  }): Promise<SuccessDto> {
    const user: User = await this.userService.findByEmail(input.email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const params = `query {
      forgotPassword(input: {email: "${user.email}"}) {
        token
        token_expiry
      }
    }`;
    const result: any = await this.gqlClient.send(params);
    console.log(`Reset Password Token is: ${result.forgotPassword.token}`);
    // Send Forgot Password Email
    return {
      status: 'SUCCESS',
      expired_at: result?.forgotPassword?.token_expiry,
      message: 'Reset password link has been successfully sent.',
    };
  }

  async changePassword(
    token: string,
    input: { [key: string]: string },
  ): Promise<SuccessDto> {
    const params = `mutation {
      changePassword(input: { 
        token: "${token}", 
        password: "${input.password}"})
    }`;
    const result: any = await this.gqlClient.send(params);
    if (result?.errors) {
      throw new BadRequestException('Invalid Password Reset Token');
    }
    return {
      status: 'SUCCESS',
      message: 'Password has been successfully updated.',
    };
  }

  async checkStatus(token: string): Promise<SuccessDto> {
    const user: any = await this.userService.findByPasswordResetToken(token);
    if (!user) {
      throw new BadRequestException('Invalid Password Reset Token');
    }
    return {
      status: new Date() > new Date(user.token_expiry) ? 'SUCCESS' : 'EXPIRED',
      expired_at: user.token_expiry,
    };
  }
}
