import { Module } from '@nestjs/common';
import { join } from 'path';
import { EmailModule } from './email/email.module';
import { OtpModule } from './otp/otp.module';
import { SMSModule } from './sms/sms.module';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    EmailModule,
    OtpModule,
    SMSModule,
    NotifyModule,
    GraphQLFederationModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (configService: ConfigurationService) => ({
        debug: configService.GRAPHQL.DEBUG,
        autoSchemaFile: join(`${process.cwd()}/schema.gql`),
        playground: configService.GRAPHQL.PLAYGROUND,
      }),
      inject: [ConfigurationService],
    }),
  ],
})
export class V1Module {}
