import { Injectable } from '@nestjs/common';
import { DEFAULT_TEMPLATE_NAME } from '@common/constants';
import { SMSGQL } from './sms.model';

import axios from 'axios';
@Injectable()
export class SMSService {
  constructor() {}
  async sendSMS(emailObj: Record<string, any>, keys?: string[]): Promise<any> {
  
    return axios.post('http://localhost:3000/sendsms', {
      from: "03217675129",
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
