import { Injectable } from '@nestjs/common';

import { NotifyRepository } from '@rubix/core/repository/';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { Notify } from './notify.model';
import { DEFAULT_NOTIFY_STATUS } from '@rubix/common/constants';

@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyDB: NotifyRepository,
    private readonly _config: ConfigurationService,
  ) {}

  async sendPushNotification(
    notifyOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<Notify> {
    notifyOBJ = {
      ...notifyOBJ,
      status: DEFAULT_NOTIFY_STATUS,
      created_on : new Date(),
      created_by: '515032eb-5af8-40f0-b3ed-6063000294ff'
    }
    const notify = await this.notifyDB.create(notifyOBJ,columns);
    return notify;
  }

  async sendFCMNotification(){
    // src/app/v1/notify/aion-rubix-firebase-adminsdk-p7bal-5c3654a277.json
  }
}
