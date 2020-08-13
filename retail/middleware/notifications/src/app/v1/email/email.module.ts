import { Module } from '@nestjs/common';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';
import { CommonModule } from '@common/common.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { DEFAULT_SENDING_NAME, DEFAULT_SENDING_EMAIL } from '@common/constants';


@Module({
  imports: [
    MailerModule.forRootAsync({

      imports: [CommonModule],
      useFactory: async (_configService: ConfigurationService) => ({
        transport: {
          host: 'smtp.mailtrap.io',
          port: 465,
          ignoreTLS: true,
          secure: false,
          auth: _configService.SMTP,
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
      inject: [ConfigurationService],
    }),
  ],
  controllers: [],
  providers: [EmailService, EmailResolver],
})
export class EmailModule {}
