import { Injectable } from '@nestjs/common';
import { NotifyRepository } from '@rubix/core/repository/';
import { Notify } from './notify.model';
import { DEFAULT_NOTIFY_STATUS } from '@rubix/common/constants';
import { FirebaseService } from '@rubix/common/connections/firebase/firebase.service';

@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyDB: NotifyRepository,
    private readonly firebaseService :FirebaseService,
  ) {
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

    const notifyResponse = await this.firebaseService.send(message);
    if(!notifyResponse) throw new Error(notifyResponse);
    console.log('Successfully sent message:', notifyResponse);
    delete notifyOBJ.token;
    notifyOBJ = {
      ...notifyOBJ,
      status: DEFAULT_NOTIFY_STATUS,
    };
    console.log(notifyOBJ);
    const [notify] = await this.notifyDB.create(notifyOBJ, columns);
    return notify;
  }
}
