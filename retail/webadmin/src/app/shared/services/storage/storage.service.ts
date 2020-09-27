import { Injectable } from '@angular/core';
import { EncryptionService } from '../encryption-service/encryption.service';
@Injectable(
  { providedIn: 'root' }
)
export class StorageService {
  constructor(private encryption: EncryptionService) { }
  setItem(key: any, data: any) {
    const encryptedValue = this.encryption.encrypt(data)
    localStorage.setItem(key, encryptedValue);
  }
  getItem(key: any) {
    const data = localStorage.getItem(key);
    if (!data) return null;
    const encryptedValue = this.encryption.decrypt(data);
    return encryptedValue;
  }
  hasKey(key: any) {
    if (this.getItem(key) === null) {
      return false;
    }
    return true;
  }

  removeItem(key: any) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
