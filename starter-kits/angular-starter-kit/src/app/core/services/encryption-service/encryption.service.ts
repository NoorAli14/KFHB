import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }
  encrypt(value) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(value), environment.APP_SECRETE).toString();
    } catch (error) {
      return null;
    }
  }
  decrypt(value) {
    try {
      return JSON.parse(CryptoJS.AES.decrypt(value, environment.APP_SECRETE).toString(CryptoJS.enc.Utf8))
    } catch (error) {
      return null;
    }
  }
}
