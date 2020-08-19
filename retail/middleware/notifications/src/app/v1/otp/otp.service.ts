import { Injectable } from '@nestjs/common';
import * as randomize from 'randomatic';

import { OtpRepository } from '@rubix/core/repository/';
import { Otp } from './otp.model';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { EmailService } from '../email/email.service';
import { SMSService } from '../sms/sms.service';
 import { OTP_SMS_CONTENT } from '../sms/default_messages'
import {
  DEFAULT_OTP_EMAIL_TEMPLATE,
  DEFAULT_OTP_EMAIL_SUBJECT,
} from '@common/constants';

@Injectable()
export class OtpService {
  constructor(
    private readonly otpDB: OtpRepository,
    private readonly _config: ConfigurationService,
    private readonly emailService: EmailService,
    private readonly smsService: SMSService,
    
  ) {}

  async verify(
    otpOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<any> {
    // Find last record of OTP against user_id
    const data = await this.otpDB.findByUserId(otpOBJ.user_id);

    // Check Already verified or not?
    if (data.status == 'varified') {
      console.log('OTP already verified.');
      return { code: 401, status: 'OTP_ALREADY_VERIFIED' };
    }

    // check time expire or not?
    var diff = (new Date().getTime() - data.created_on.getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));

    if (diff > this._config.OTP.duration) {
      console.log('OTP code has been expired.');
      return { code: 401, status: 'OTP_EXPIRED' };
    }

    if (data.otp_code == otpOBJ.otp_code) {
      console.log('OTP Varified successfully.');
      const [otp] = await this.otpDB.update(
        { id: data.id },
        { status: 'varified', updated_on: new Date() },
        columns,
      );
      return { code: 401, status: 'OTP_VERIFIED' };
    }
  }

  async create(
    otpOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<Otp> {
    otpOBJ.otp_code = await randomize(
      this._config.OTP.pattern,
      this._config.OTP.otp_length,
    );
    otpOBJ.status = this._config.OTP.status;
    otpOBJ.created_on = new Date();
    otpOBJ.created_by = otpOBJ.user_id;
    otpOBJ.updated_on = new Date();
    otpOBJ.updated_by = otpOBJ.user_id;

    const [otp] = await this.otpDB.create(otpOBJ, columns);
    // Send OTP Via email function call.
    if (otp && (otpOBJ.delivery_mode == 'email' || otpOBJ.delivery_mode == 'both')) {
      const emailObj = {
        to: otpOBJ.email,
        subject: DEFAULT_OTP_EMAIL_SUBJECT,
        template: DEFAULT_OTP_EMAIL_TEMPLATE,
        context: {
          otp_code: otpOBJ.otp_code,
        },
      };
      await this.emailService.sendEmail(emailObj, ['email']);
    }

    // Send OTP via SMS function call.
    if (otp && (otpOBJ.delivery_mode == 'mobile' || otpOBJ.delivery_mode == 'both')) {
      const smsObj = {
        to: otpOBJ.mobile_no,
        body: OTP_SMS_CONTENT.replace('<otp_code>',otpOBJ.otp_code).replace('<user_id>', otpOBJ.user_id),
      };
      await this.smsService.sendSMS(smsObj, ['mobile_no']);
    }
    return otp;
  }
}
