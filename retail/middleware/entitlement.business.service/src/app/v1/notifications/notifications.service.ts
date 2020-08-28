import { Injectable } from '@nestjs/common';
import {
  GqlClientService,
  ConfigurationService,
  toGraphql,
} from '@common/index';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly gqlClient: GqlClientService,
    private readonly configService: ConfigurationService,
  ) {}

  async sendGenericEmail() {
    const params: string = `mutation {
        result: sendEmail(
          input: {
            to: "faizan@aiondigital.com"
            template: "default"
            subject: "Congratulations for new Role."
            body: "Hi Faizan, This is a testing email.",
            context: [
              { key: "title", value: "SAMPLETITLE" }
              {key: "name", value: "Ahmad"}
              {key: "body", value: "Hello Ahmad, hope this mail will find you in a good health"}
            ]
          }
        ) {
          to
        }
      }`;
    return this.gqlClient.send(params);
  }

  async sendInvitationLink(to: string, token: string) {
    const input: any = {
      to: to,
      subject: 'Congratulations! You have been invited on Rubix',
      template: 'default',
      body: `Hi ${to}, </br></br> Please click on the <a href="${this.configService.APP.WEB_ONBOARDING_LINK}/${token}">link</a> to complete your onboarding process. </br></br> Best Regards,</br> <strong>Aion Rubix</strong>`,
      context: [],
    };
    const params: string = `mutation {
        result: sendEmail(
          input: ${toGraphql(input)}
        ) {
          to
        }
      }`;
    return this.gqlClient.send(params);
  }

  async sendResetPasswordLink(to: string, token: string) {
    const input: any = {
      to: to,
      subject: 'Password Reset Instructions',
      template: 'default',
      body: `Hi ${to}, </br></br> Please click on the <a href="${this.configService.APP.WEB_RESET_PASSWORD_LINK}/${token}">link</a> to reset your password. </br></br> Best Regards,</br> <strong>Aion Rubix</strong>`,
      context: [],
    };
    const params: string = `mutation {
        result: sendEmail(
          input: ${toGraphql(input)}
        ) {
          to
        }
      }`;
    return this.gqlClient.send(params);
  }
}
