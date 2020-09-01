import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { NotifyRepository } from '@rubix/core/repository/';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { Notify } from './notify.model';
import { DEFAULT_NOTIFY_STATUS } from '@rubix/common/constants';

@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyDB: NotifyRepository,
    private readonly _config: ConfigurationService,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: this._config.FIREBASE.CLIENT_EMAIL,
        privateKey: this._config.FIREBASE.PRIVATE_KEY,
        projectId: this._config.FIREBASE.PROJECT_ID.replace(/\\n/g, '\n'),
      }),
    });
  }

  async sendPushNotification(
    notifyOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<Notify> {

    // var topicName = 'industry-tech'

    var message = {
      notification: {
        title: notifyOBJ.message_title,
        body: notifyOBJ.message_body,
      },
      // actoin: ""
      // android: {
      //   notification: {
      //     icon: 'stock_ticker_update',
      //     color: '#7e55c3'
      //   }
      // },
      // topic: topicName,
      token: notifyOBJ.token,
    };

    return admin
      .messaging()
      .send(message)
      .then(async response => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        delete notifyOBJ.token;
        notifyOBJ = {
          ...notifyOBJ,
          status: DEFAULT_NOTIFY_STATUS,
        };
        console.log(notifyOBJ);
        const [notify] = await this.notifyDB.create(notifyOBJ, columns);
        return notify;
      })
      .catch(error => {
        console.log('Error sending message:', error);
      });
  }
}
