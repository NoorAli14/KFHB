import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(emailObj: Record<string, any>, keys?: string[]): Promise<any> {
      console.log("Email Obj............................");
      console.log(emailObj);
      console.log("Keys.................................");
      console.log(keys);

      // if emailObj has template = default
      // send simple message with subject, body to list of recipeints.
      // if other templates then replace context variables and send to recipients.

      let message : any = {
        to: emailObj.to,
        subject: emailObj.subject
      };

      if(emailObj.template && emailObj.template == 'default'){
        message.html = emailObj.body;
      }else{
        message.template = emailObj.template;
        message.context = emailObj.context;
      }

    await this.mailerService.sendMail(message);
    return emailObj;
  }
}
