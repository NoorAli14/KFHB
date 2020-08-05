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
    return await this.mailerService.sendMail({
      to: emailObj.to, // list of receivers
      // from: 'mraza@aiondigital.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
    //   text: 'welcome', // plaintext body
      // html: '<b>welcome Ahmad Raza again from mraza to mraza.</b>', // HTML body content
      template: 'sample', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      context: {  // Data to be sent to template engine.
        title: 'This is Title',
        body: 'This is Body.',
      },
      // context: emailObj.context
    });
    //   .then(() => {})
    //   .catch(() => {});
  }
}
