import { Injectable, Logger } from '@nestjs/common';
import { IOTP_INPUT } from './otp.interface';
import {
  GqlClientService,
  IHEADER,
  toGraphql,
  SuccessDto,
  STATUSES,
} from '@common/index';
import { User } from '../users/user.entity';
import { VerifyOTPDto } from './otp.dto';
@Injectable()
export class OtpService {
  private readonly logger: Logger = new Logger(OtpService.name);

  private readonly output: string = `{
    id,
    user_id,
    otp_code,
    status
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  /**
   *
   * @param header GQL request headers
   * @param currentUser Current LoggedIn User
   * @return The success object
   */
  async send(
    header: IHEADER,
    currentUser: any,
    mode: string,
  ): Promise<SuccessDto> {
    const input: IOTP_INPUT = {
      user_id: currentUser.id,
      delivery_mode: mode,
      email: currentUser.email,
      mobile_no: currentUser.contact_no,
    };
    this.logger.log(input);
    // Construct GraphQL request
    const mutation: string = `mutation {
      result: generateOtp(input: ${toGraphql(input)}) ${this.output}
    }`;
    const otp: any = await this.gqlClient.setHeaders(header).send(mutation);
    if (otp?.id) {
      this.logger.log(otp);
      return {
        status: STATUSES.SUCCESS,
        message: `OTP has been successfully sent`,
      };
    }
    return {
      status: STATUSES.FAILED,
      message: `OTP has been successfully sent`,
    };
  }

  /**
   *
   * @param header GQL request headers
   * @return {Promise<SuccessDto}
   */
  async verify(
    header: IHEADER,
    currentUser: User,
    input: VerifyOTPDto,
  ): Promise<SuccessDto> {
    const mutation: string = `mutation {
      result: verifyOtp(
        input: {
          user_id: "${currentUser.id}"
          otp_code: "${input.code}"
        }
      ){
        status
        code
      }
    }`;
    const result: any = await this.gqlClient.setHeaders(header).send(mutation);
    return {
      status: result.code,
    };
  }
}
