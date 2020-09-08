import { Injectable, HttpService } from '@nestjs/common';
import { SMS } from './sms.model';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SMSService {
  constructor(
    private readonly _config: ConfigurationService,
    private readonly httpService: HttpService,
    ) {}
  async sendSMS(smsObj: Record<string, any>, keys?: string[]): Promise< any | SMS > {
    return this.httpService.post(this._config.SMS.api_url, {
      from: this._config.SMS.from,
      body: smsObj.body,
      to: smsObj.to
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }).toPromise().then(response => {
      console.log("Message Delivered Successfully!");
      console.log(response.data);
      return {'to':smsObj.to, 'body': smsObj.body};
    }).catch(function (error) {
      console.log(error);
      return { 
        "error": error,
        "code": 401
      }
    });
  }
}
