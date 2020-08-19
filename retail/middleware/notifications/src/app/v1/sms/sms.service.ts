import { Injectable } from '@nestjs/common';
import { SMSGQL } from './sms.model';
import { ConfigurationService } from '@common/configuration/configuration.service';


import axios from 'axios';
@Injectable()
export class SMSService {
  constructor(private readonly _config: ConfigurationService) {}
  async sendSMS(emailObj: Record<string, any>, keys?: string[]): Promise<any> {

    return axios.post(this._config.SMS.from, {
      from: this._config.SMS.from,
      body: emailObj.body,
      to: emailObj.to
    })
    .then(function (response) {
      console.log(response);
      return emailObj;
    })
    .catch(function (error) {
      console.log(error);
      return { 
        "error": error,
        "code": 401
      }
    });

  }
}
