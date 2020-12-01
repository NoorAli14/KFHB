import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../../../common/configuration/configuration.service';
import * as admin from 'firebase-admin';
import { FCMNotification } from '@rubix/common/interfaces/connections.interface';

@Injectable()
export class FirebaseService {
  constructor(private readonly _config: ConfigurationService) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: this._config.FIREBASE.CLIENT_EMAIL,
        privateKey: this._config.FIREBASE.PRIVATE_KEY.replace(/\\n/g, '\n'),
        projectId: this._config.FIREBASE.PROJECT_ID,
      }),
    });
  }
  public async send(obj: FCMNotification): Promise<any> {
    return await admin.messaging().send(obj);
  }
}
