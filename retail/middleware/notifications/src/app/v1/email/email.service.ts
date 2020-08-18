import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { DEFAULT_TEMPLATE_NAME } from '@common/constants';
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(emailObj: Record<string, any>, keys?: string[]): Promise<any> {

      let message : any = {
        to: emailObj.to,
        subject: emailObj.subject
      };

      if(emailObj.template && emailObj.template == DEFAULT_TEMPLATE_NAME){
        message.html = emailObj.body;
      }else{
        // Parse Context Object.
        let contextObj = JSON.parse(JSON.stringify(emailObj.context));
        var context = {};
        if(contextObj instanceof Array){
          contextObj.forEach((e: { key: string | number; value: any; }) => { context[e.key] = e.value });
        }else{
          context = contextObj;
        }

        message.template = emailObj.template;
        message.context = context;
      }

    await this.mailerService.sendMail(message);
    return emailObj;
  }
}
