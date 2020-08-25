import { Injectable } from '@nestjs/common';
import { toGraphql } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { ConfigurationService } from '@common/configuration/configuration.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly gqlClient: GqlClientService,
    private readonly configService: ConfigurationService,
  ) {}

  async sendGenericEmail() {
    const params: string = `mutation {
        notification: sendEmail(
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
    const result = await this.gqlClient.send(params);
    return result?.notification;
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
        notification: sendEmail(
          input: ${toGraphql(input)}
        ) {
          to
        }
      }`;
    return (await this.gqlClient.send(params)).notification;
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
        notification: sendEmail(
          input: ${toGraphql(input)}
        ) {
          to
        }
      }`;
    return (await this.gqlClient.send(params)).notification;
  }
}
