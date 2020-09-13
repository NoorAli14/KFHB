import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../../../common/configuration/configuration.service';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(private readonly _config: ConfigurationService) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: this._config.FIREBASE.CLIENT_EMAIL,
        privateKey: this._config.FIREBASE.PRIVATE_KEY,
        projectId: this._config.FIREBASE.PROJECT_ID.replace(/\\n/g, '\n'),
      }),
    });
  }
  public async send(obj: any): Promise<any> {
    return await admin.messaging().send(obj);
  }
}
