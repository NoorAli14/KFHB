import { Injectable } from '@nestjs/common';
import { SMS } from './sms.model';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { HttpClientService } from '@common/connections/httpclient/httpclient.service';

interface iSMS {
  from: string;
  to: string;
  body: string;
}
@Injectable()
export class SMSService {
  constructor(
    private readonly _config: ConfigurationService,
    private readonly httpClientService: HttpClientService,
  ) {}

  async sendSMS(
    smsObj: Record<string, any>,
  ): Promise<{ [key: string]: any } | SMS> {
    const params: iSMS = {
      from: this._config.SMS.from,
      body: smsObj.body,
      to: smsObj.to,
    };
    const apiObj = await this.httpClientService.send(
      this._config.SMS.api_url,
      params,
    );
    if (!apiObj.data) throw new Error(apiObj);
    console.log(apiObj.data);
    // In case of Success, I'm going to send Sample Response, It will be change in future acc to API.
    const responseObj = { to: smsObj.to, body: smsObj.body };
    return responseObj;
  }
}
