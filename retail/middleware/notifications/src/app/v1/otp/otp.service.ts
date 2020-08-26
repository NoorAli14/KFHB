import { Injectable } from '@nestjs/common';
import * as randomize from 'randomatic';
import axios from 'axios';


import { OtpRepository } from '@rubix/core/repository/';
import { Otp, OTPResponse } from './otp.model';
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
  ): Promise<OTPResponse> {
    // Find last record of OTP against user_id
    const data = await this.otpDB.findByUserId(otpOBJ.user_id);

    if(!data || data == undefined)
      return { status: 400, code: 'INVALID_USER'};

    // Check Already verified or not?
    if (data.status == 'varified') {
      return { status: 400, code: 'OTP_ALREADY_VERIFIED' };
    }

    // check time expire or not?
    var diff = (new Date().getTime() - data.created_on.getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));

    if (diff > this._config.OTP.duration) {
      return { status: 400, code: 'OTP_EXPIRED' };
    }

    if (data.otp_code == otpOBJ.otp_code) {
      const [otp] = await this.otpDB.update(
        { id: data.id },
        { status: 'varified', updated_on: new Date() },
        ['id', 'status'],
      );
      return { status: 200, code: 'OTP_VERIFIED' };
    }
    else{
      return { status: 400, code: 'INVALID_OTP' };
    }
  }

  async create(
    otpOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<Otp> {
    if(this._config.OTP.OTP_BY_API){

      axios.post(this._config.OTP.API_URL, {
        pattern: this._config.OTP.pattern,
        otp_length: this._config.OTP.otp_length,
      }).then(function (response: { [key: string]: any }) {
        console.log(response)
        otpOBJ.otp_code = response.data.OTP;
      })
      .catch(function (error) {
        console.log(error);
        return { 
          "error": error,
          "code": 401
        }
      });

    }else{
      otpOBJ.otp_code = await randomize(
        this._config.OTP.pattern,
        this._config.OTP.otp_length,
      );
    }

    otpOBJ.status = this._config.OTP.status;
    otpOBJ.created_on = new Date();
    otpOBJ.tenent_id = otpOBJ.user_id;
    otpOBJ.created_by = otpOBJ.user_id;

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
