import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

import { toGraphQL } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { iEmailRequest } from './interfaces/email-request.interface';

@Injectable()
export class EmailService {
  constructor(private readonly gqlClient: GqlClientService) {}

  /**
   *
   * @param list
   * @param user_id
   * @param user_name
   * @param call_time
   * calling another service to send email to all available agents.
   *
   */
  async send_email_to_agents(
    list: string[],
    user_id: string,
    user_name: string,
    call_time: Date,
  ): Promise<void> {
    const input: iEmailRequest = {
      bcc: list,
      template: 'appointment_sucess',
      subject: 'New Appointment',
      body: '',
      context: [
        { key: 'title', value: 'New Appointment' },
        { key: 'customer_id', value: user_id },
        { key: 'customer_name', value: user_name },
        {
          key: 'appointment_date',
          value: moment(call_time).format('YYYY-MM-DD'),
        },
        { key: 'appointment_time', value: moment(call_time).format('HH:mm') },
      ],
    };

    const mutation = `mutation {
      result: sendEmail(input: ${toGraphQL(input)}) {
        bcc
      }
    }`;

    return await this.gqlClient
      .client('ENV_RBX_NOTIFICATION_SERVER')
      .send(mutation);
  }
}
