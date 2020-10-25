import { Injectable } from '@nestjs/common';

import { toGraphQL } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { iPushNotification } from './interfaces/push_notification.interface';

@Injectable()
export class PushNotificationService {
  constructor(private readonly gqlClient: GqlClientService) {}

  /**
   *
   * @param input
   * calling another service to send push notification to the user.
   *
   */
  async send_push_notification(input: iPushNotification): Promise<boolean> {
    const mutation = `mutation {
      result: sendPushNotification(input: ${toGraphQL(input)}) {
        id
        platform
        device_id
        message_title
        message_body
        image_url
        status
        created_on
        created_by
      }
    }`;

    return this.gqlClient.client('ENV_RBX_NOTIFICATION_SERVER').send(mutation);
  }
}
