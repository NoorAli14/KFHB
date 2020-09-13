import { Injectable, Logger } from '@nestjs/common';
import { redomize, calculateDuration } from '@common/utilities';

import { OtpRepository } from '@rubix/core/repository/';
import { Otp, OTPResponse } from './otp.model';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { HttpClientService } from '@common/connections/httpclient/httpclient.service';

import { EmailService } from '../email/email.service';
import { SMSService } from '../sms/sms.service';
import { OTP_SMS_CONTENT } from '../sms/default_messages';
import {
  DEFAULT_OTP_EMAIL_TEMPLATE,
  DEFAULT_OTP_EMAIL_SUBJECT,
  OTP_STATUSES,
  DELIVERY_MODES,
} from '@common/constants';

interface iOtpInput {
  user_id: string;
  delivery_mode: string;
  otp_code: string;
  status: string;
  created_by: string;
  updated_by: string;
  tenant_id: string;
}

interface iOtpGenerate {
  pattern: string;
  length: number;
}

interface iResponse {
  status: number;
  code: string;
}
@Injectable()
export class OtpService {
  private readonly __logger: Logger = new Logger(OtpService.name);
  constructor(
    private readonly otpDB: OtpRepository,
    private readonly _config: ConfigurationService,
    private readonly emailService: EmailService,
    private readonly smsService: SMSService,
    private readonly httpClientService: HttpClientService,
  ) {}

  async verify(otpOBJ: { [key: string]: any }): Promise<OTPResponse> {
    const response: iResponse = {
      status: 400,
      code: '',
    };
    // Find last record of OTP against user_id
    const data = await this.otpDB.findByUserId(otpOBJ.user_id);
    if (!data || data == undefined) {
      response.code = 'INVALID_USER';
      return response;
    }

    // Check Already verified or not?
    if (data.status == 'varified') {
      response.code = 'OTP_ALREADY_VERIFIED';
      return response;
    }

    // check time expire or not?
    const duration = calculateDuration(data.created_on);

    if (duration > this._config.OTP.duration) {
      response.code = 'OTP_EXPIRED';
      return response;
    }

    if (data.otp_code == otpOBJ.otp_code) {
      await this.otpDB.update(
        { id: data.id },
        { status: OTP_STATUSES.VERIFIED, updated_on: new Date() },
        ['id', 'status'],
      );
      response.code = 'OTP_VERIFIED';
      response.status = 200;
      return response;
    } else {
      response.code = 'INVALID_OTP';
      return response;
    }
  }

  async create(
    currentUser: { [key: string]: any },
    otpOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<Otp | any> {
    this.__logger.log(`Start Generating OTP for user ID [${currentUser.id}]`);
    const otpGenerate: iOtpGenerate = {
      pattern: this._config.OTP.pattern,
      length: this._config.OTP.otp_length,
    };

    const input: iOtpInput = {
      status: OTP_STATUSES.PENDING,
      created_by: currentUser.id,
      updated_by: currentUser.id,
      otp_code: null,
      delivery_mode: otpOBJ.delivery_mode,
      user_id: otpOBJ.user_id,
      tenant_id: currentUser.id,
    };

    if (this._config.OTP.OTP_BY_API) {
      const apiObj = await this.httpClientService.send(
        this._config.OTP.API_URL,
        otpGenerate,
      );
      if (!apiObj.data) throw new Error(apiObj);
      // According to Orignal API Response, this assignment will be change.
      input.otp_code = apiObj.data.OTP;
      console.log(apiObj.data);
    } else {
      input.otp_code = await redomize(otpGenerate);
    }

    if (!input.otp_code) throw new Error('OTP_GENERATION_FAILED');
    const promises = [this.otpDB.create(input, columns)];

    // Send OTP Via email function call.
    if (
      otpOBJ.delivery_mode == DELIVERY_MODES.EMAIL ||
      otpOBJ.delivery_mode == DELIVERY_MODES.BOTH
    ) {
      const emailObj = {
        to: otpOBJ.email,
        subject: DEFAULT_OTP_EMAIL_SUBJECT,
        template: DEFAULT_OTP_EMAIL_TEMPLATE,
        context: {
          otp_code: otpOBJ.otp_code,
        },
      };
      promises.push(this.emailService.sendEmail(emailObj));
    }

    // Send OTP via SMS function call.
    if (
      otpOBJ.delivery_mode == DELIVERY_MODES.MOBILE ||
      otpOBJ.delivery_mode == DELIVERY_MODES.BOTH
    ) {
      const smsObj = {
        to: otpOBJ.mobile_no,
        body: OTP_SMS_CONTENT.replace('<otp_code>', otpOBJ.otp_code).replace(
          '<user_id>',
          otpOBJ.user_id,
        ),
      };
      promises.push(this.smsService.sendSMS(smsObj));
    }

    const result = await Promise.all(promises);
    return result[0][0];
  }
}
