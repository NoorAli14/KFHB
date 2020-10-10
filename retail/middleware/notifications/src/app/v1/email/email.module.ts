import { Module } from '@nestjs/common';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';
import { CommonModule } from '@common/common.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { ConfigurationService } from '@common/configuration/configuration.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (_configService: ConfigurationService) => ({
        transport: _configService.SMTP,
        defaults: {
          from: `"${_configService.EMAILSENDER.NAME}" <${_configService.EMAILSENDER.EMAIL}>`,
        },
        preview: false,
        template: {
          // dir: __dirname + '/templates',
          dir: join(`${process.cwd()}`, './volumes/templates'),
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
  exports: [EmailService],
})
export class EmailModule { }
