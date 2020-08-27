import { Injectable } from '@nestjs/common';

import { NotifyRepository } from '@rubix/core/repository/';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { Notify } from './notify.model';

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
    const notify = await this.notifyDB.create(notifyOBJ,columns);
    return notify;
  }
}
