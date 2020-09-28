import { Injectable, Logger } from '@nestjs/common';
import {
  GqlClientService,
  ConfigurationService,
  toGraphql,
} from '@common/index';

@Injectable()
export class NotificationsService {
  private readonly logger: Logger = new Logger(NotificationsService.name);
  constructor(
    private readonly gqlClient: GqlClientService,
    private readonly configService: ConfigurationService,
  ) { }

  async sendInvitationLink(to: string, token: string): Promise<any> {
    const input: any = {
      to: to,
      subject: 'Congratulations! You have been invited on Rubix',
      template: 'default',
      body: `Hi ${to}, </br></br> Please click on the <a href="${this.configService.APP.WEB_ONBOARDING_LINK}/${token}">link</a> to complete your onboarding process. </br></br> Best Regards,</br> <strong>Aion Rubix</strong>`,
      context: [],
    };
    return this.triggerEmail(input);
  }

  async sendResetPasswordLink(to: string, token: string): Promise<any> {
    const input: any = {
      to: to,
      subject: 'Password Reset Instructions',
      template: 'default',
      body: `Hi ${to}, </br></br> Please click on the <a href="${this.configService.APP.WEB_RESET_PASSWORD_LINK}/${token}">link</a> to reset your password. </br></br> Best Regards,</br> <strong>Aion Rubix</strong>`,
      context: [],
    };
    return this.triggerEmail(input);
  }

  async triggerEmail(input: Record<string, any>): Promise<any> {
    this.logger.log(`Email:: Send email to [${input.email}]`)
    const mutation: string = `mutation {
      result: sendEmail(
        input: ${toGraphql(input)}
      ) {
        to
      }
    }`;
    return this.gqlClient.send(mutation);
  }
}
