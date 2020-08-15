import { Injectable, BadRequestException } from '@nestjs/common';
import { SuccessDto } from '@common/dtos/';
import { User } from '@app/v1/users/user.entity';
@Injectable()
export class ForgotPasswordService {
  async sendResetPasswordLink(input: {
    [key: string]: string;
  }): Promise<SuccessDto> {
    return { status: 'SUCCESS', expired_at: new Date() };
  }

  async changePassword(
    token: string,
    input: { [key: string]: string },
  ): Promise<SuccessDto> {
    return { status: 'SUCCESS', expired_at: new Date() };
  }

  async checkStatus(token: string): Promise<SuccessDto> {
    const user = await this.findUserByResetToken(token);
    if (!user) {
      throw new BadRequestException('Invalid Password Reset Token');
    }
    return { status: 'SUCCESS', expired_at: new Date() };
  }

  async findUserByResetToken(token: string): Promise<User> {
    return new User();
  }
}
