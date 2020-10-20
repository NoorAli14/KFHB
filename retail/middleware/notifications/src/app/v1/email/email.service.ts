import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { DEFAULT_TEMPLATE_NAME } from '@common/constants';
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(emailObj: Record<string, any>): Promise<any> {
    const message: any = {
      subject: emailObj.subject,
    };

    if(emailObj.to){
      message.to = emailObj.to;
    }

    if(emailObj.cc){
      message.cc = emailObj.cc;
    }

    if(emailObj.bcc){
      message.bcc = emailObj.bcc;
    }

    if (emailObj.template && emailObj.template == DEFAULT_TEMPLATE_NAME) {
      message.html = emailObj.body;
    } else {
      // Parse Context Object.
      const contextObj = JSON.parse(JSON.stringify(emailObj.context));
      let context = {};
      if (contextObj instanceof Array) {
        contextObj.forEach((e: { key: string | number; value: any }) => {
          context[e.key] = e.value;
        });
      } else {
        context = contextObj;
      }

      message.template = emailObj.template;
      message.context = context;
    }

    await this.mailerService.sendMail(message);
    return emailObj;
  }
}
