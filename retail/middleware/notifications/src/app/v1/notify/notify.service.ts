import { Injectable, Logger } from '@nestjs/common';
import { NotifyRepository } from '@rubix/core/repository/';
import { Notify } from './notify.model';
import { DEFAULT_NOTIFY_STATUS } from '@rubix/common/constants';
import { FirebaseService } from '@rubix/common/connections/firebase/firebase.service';
import { json } from 'body-parser';

interface iNotifyInput {
  platform: string;
  device_id: string;
  message_title: string;
  message_body: string;
  image_url: string;
  payload?: string;
  status: string;
  created_by: string;
  updated_by: string;
}
interface iMessageInput {
  notification: {
    title: string;
    body: string;
  };
  token: string;
  data?: {
    payload: string;
  };
}
@Injectable()
export class NotifyService {
  private readonly __logger: Logger = new Logger(NotifyService.name);

  constructor(
    private readonly notifyDB: NotifyRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  async sendPushNotification(
    currentUser: { [key: string]: any },
    notifyOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<Notify> {
    this.__logger.log(
      `Start Sending Push Notification for user ID [${currentUser.id}]`,
    );

    // Converting Base64 to String.
    let jsonPayload = Buffer.from(notifyOBJ.payload, 'base64').toString('ascii')
    console.log(typeof(jsonPayload))
    

    const message: iMessageInput = {
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
      // topic: 'industry-tech',
      token: notifyOBJ.token,
    };

    if (notifyOBJ.payload) {
      message.data = {
        payload: jsonPayload,
      };
    }

    const promises = [this.firebaseService.send(message)];

    const input: iNotifyInput = {
      platform: notifyOBJ.platform,
      device_id: notifyOBJ.device_id,
      message_title: notifyOBJ.message_title,
      message_body: notifyOBJ.message_body,
      image_url: notifyOBJ.image_url,
      status: DEFAULT_NOTIFY_STATUS,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    };

    if (notifyOBJ.payload) {
      input.payload = jsonPayload;
    }
    promises.push(this.notifyDB.create(input, columns));
    const result = await Promise.all(promises);
    return result[1][0];
  }
}
