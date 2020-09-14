import { Injectable } from '@nestjs/common';
import {
  GqlClientService,
  ConfigurationService,
  toGraphql,
  IHEADER,
} from '@common/index';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly gqlClient: GqlClientService,
    private readonly configService: ConfigurationService,
  ) {}

  async sendInvitationLink(header: IHEADER, to: string, token: string) {
    const input: any = {
      to: to,
      subject: 'Congratulations! You have been invited on Rubix',
      template: 'default',
      body: `Hi ${to}, </br></br> Please click on the <a href="${this.configService.APP.WEB_ONBOARDING_LINK}/${token}">link</a> to complete your onboarding process. </br></br> Best Regards,</br> <strong>Aion Rubix</strong>`,
      context: [],
    };
    const mutation: string = `mutation {
        result: sendEmail(
          input: ${toGraphql(input)}
        ) {
          to
        }
      }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async sendResetPasswordLink(header: IHEADER, to: string, token: string) {
    const input: any = {
      to: to,
      subject: 'Password Reset Instructions',
      template: 'default',
      body: `Hi ${to}, </br></br> Please click on the <a href="${this.configService.APP.WEB_RESET_PASSWORD_LINK}/${token}">link</a> to reset your password. </br></br> Best Regards,</br> <strong>Aion Rubix</strong>`,
      context: [],
    };
    const mutation: string = `mutation {
        result: sendEmail(
          input: ${toGraphql(input)}
        ) {
          to
        }
      }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
