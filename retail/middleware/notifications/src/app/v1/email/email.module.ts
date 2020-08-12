import { Module } from '@nestjs/common';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { DEFAULT_SENDING_NAME, DEFAULT_SENDING_EMAIL } from '@common/constants';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 465,
        ignoreTLS: true,
        secure: false,
        auth: {
          // user: process.env.ENV_RBX_SMTP_USER,
          // pass: process.env.ENV_RBX_SMTP_PASS,
          user: "356fe6cfe6252c",
          pass: "4ba4380d9fdcb9",
        },
      },
      defaults: {
        from:`"${DEFAULT_SENDING_NAME}" <${DEFAULT_SENDING_EMAIL}>`,
      },
      preview: false,
      template: {
        // dir: __dirname + '/templates',
        dir: join(`${process.cwd()}`,'./src/app/v1/email/templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [EmailService, EmailResolver],
})
export class EmailModule {}
