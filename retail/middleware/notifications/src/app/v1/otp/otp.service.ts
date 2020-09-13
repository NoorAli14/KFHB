import { Injectable } from '@nestjs/common';
import * as randomize from 'randomatic';

import { OtpRepository } from '@rubix/core/repository/';
import { Otp, OTPResponse } from './otp.model';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { httpClientService } from '@common/connections/httpclient/httpclient.service'

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
    private readonly httpClientService: httpClientService,
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
  ): Promise<Otp | any> {
    if(this._config.OTP.OTP_BY_API){
      
      const params = {
        pattern: this._config.OTP.pattern,
        otp_length: this._config.OTP.otp_length
      }
      const apiObj = await this.httpClientService.send(this._config.OTP.API_URL, params);
      if(!apiObj.data) throw new Error(apiObj);
      // According to Orignal API Response, this assignment will be change.
      otpOBJ.otp_code = apiObj.data.OTP;
      console.log(apiObj.data)
      
    }else{
      otpOBJ.otp_code = await randomize(
        this._config.OTP.pattern,
        this._config.OTP.otp_length,
      );
      if(!otpOBJ.otp_code  || otpOBJ.otp_code == undefined) throw new Error("OTP_GENERATION_FAILED");
    }

    // Send OTP Via email function call.
    if (otpOBJ.delivery_mode == 'email' || otpOBJ.delivery_mode == 'both') {
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
    if (otpOBJ.delivery_mode == 'mobile' || otpOBJ.delivery_mode == 'both') {
      const smsObj = {
        to: otpOBJ.mobile_no,
        body: OTP_SMS_CONTENT.replace('<otp_code>',otpOBJ.otp_code).replace('<user_id>', otpOBJ.user_id),
      };
      await this.smsService.sendSMS(smsObj, ['mobile_no']);
    }

    // Saving a entry into database.
    otpOBJ.status = this._config.OTP.status;
    const [otp] = await this.otpDB.create(otpOBJ, columns);
    return otp;
  }
}
