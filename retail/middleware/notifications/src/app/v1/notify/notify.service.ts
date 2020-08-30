import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { NotifyRepository } from '@rubix/core/repository/';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { Notify } from './notify.model';
import { DEFAULT_NOTIFY_STATUS } from '@rubix/common/constants';

// const serviceAccount = require('./aion-rubix-firebase-adminsdk-p7bal-5c3654a277.json');


@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyDB: NotifyRepository,
    private readonly _config: ConfigurationService,
    // private firebaseAuth: FirebaseAuthenticationService,
  ) {}

  async sendPushNotification(
    notifyOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<any> {
    notifyOBJ = {
      ...notifyOBJ,
      status: DEFAULT_NOTIFY_STATUS,
      created_on : new Date(),
      created_by: '515032eb-5af8-40f0-b3ed-6063000294ff'
    }
    // const notify = await this.notifyDB.create(notifyOBJ,columns);
    // return notify;
    await this.sendFCMNotification();
    return notifyOBJ;
  }

  async sendFCMNotification(){
    
    console.log("SEND FCM SEND NOTIFICATION FUNCTION CALLED>............................")
    console.log("SEND FCM SEND NOTIFICATION FUNCTION CALLED>............................")
    console.log("SEND FCM SEND NOTIFICATION FUNCTION CALLED>............................")
    console.log("SEND FCM SEND NOTIFICATION FUNCTION CALLED>............................")
    console.log("SEND FCM SEND NOTIFICATION FUNCTION CALLED>............................")
    console.log("SEND FCM SEND NOTIFICATION FUNCTION CALLED>............................")
    console.log("SEND FCM SEND NOTIFICATION FUNCTION CALLED>............................")


    // admin.initializeApp({
    //   credential: admin.credential.applicationDefault(serviceAccount),
    // });

    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: this._config.FIREBASE.CLIENT_EMAIL,
        privateKey: this._config.FIREBASE.PRIVATE_KEY,
        projectId: this._config.FIREBASE.PROJECT_ID
      }),
    });
    
    var topicName = 'industry-tech'

    var message = {
      notification: {
        title: '`$FooCorp` up 1.43% on the day',
        body: 'FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
      },
      android: {
        notification: {
          icon: 'stock_ticker_update',
          color: '#7e55c3'
        }
      },
      topic: topicName,
    };
    await admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });

  }
}
