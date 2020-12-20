
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
    providedIn: 'root'
})
export class EncryptionHelper {
    constructor() {
    }
    encryptCustom = (text) => {
        const key = CryptoJS.enc.Utf8.parse('8080808080808080');
        const iv = CryptoJS.enc.Utf8.parse('8080808080808080');
        const encryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encryptedData.toString();
    }
    decryptCustom = (Data) => {
        try {
            const key = CryptoJS.enc.Utf8.parse('8080808080808080');
            const iv = CryptoJS.enc.Utf8.parse('8080808080808080');
            const decrypted = CryptoJS.AES.decrypt(Data, key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            console.log(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
            return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (err) {
            console.log(err);
        }
        this.encryptCustom = (text) => {
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
            var encryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            return encryptedData.toString();
        };
    }
}
