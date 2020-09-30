import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NewAppointmentInput } from './appointment.dto';
import { AppointmentRepository } from '@core/repository';

import { ConfigurationService } from '@common/configuration/configuration.service';
import { Appointment } from './appointment.model';
import * as moment from 'moment';
import { APPOINTMENT_STATUS } from '@common/constants';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { PushNotificationModel } from './push_notification.model';
import { toGraphQL } from '@common/utilities';
import { ICurrentUser } from '@common/interfaces';
import {
  AppointmentAlreadyExistException,
  InvalidCallTimeException,
  AgentNotAvailableException,
  AppointmentNotFoundException,
} from './exceptions';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentDB: AppointmentRepository,
    private readonly configService: ConfigurationService,
    private readonly redisService: RedisService,
    private readonly gqlClient: GqlClientService,
  ) {}

  private async throw_if_appointment_exist(call_time: Date, user_id: string) {
    const record = await this.appointmentDB.findOne(
      {
        call_time: call_time,
        user_id: user_id,
        deleted_on: null,
      },
      ['id'],
    );

    if (record) throw new AppointmentAlreadyExistException(user_id);
  }

  private async throw_if_appointment_limit_exceed(call_time: Date) {
    const appointments_at_this_time: any[] = await this.appointmentDB.findBy(
      {
        call_time: call_time,
      },
      ['id'],
    );

    if (
      appointments_at_this_time.length >=
      parseInt(this.configService.get('ENV_RBX_MAX_APPOINTMENTS_AT_A_TIME'))
    ) {
      throw new Error(
        'Appointment cannot be saved at this time, Please choose another time.',
      );
    }
  }

  async create(
    currentUser: ICurrentUser,
    newAppointment: NewAppointmentInput,
    output?: string[],
  ): Promise<Appointment> {
    // Section: Validating Input
    // Validate the input and Time of the appointment

    // Section: Check the Duplicate
    // TODO: Only if we want to allow limited number of appointment on a specific time.
    // this.throw_if_appointment_limit_exceed(newAppointment.call_time)

    await this.throw_if_appointment_exist(
      newAppointment.call_time,
      newAppointment.user_id,
    );
    // End Section: Check the Duplicate

    // Check the Past date and time
    if (newAppointment.call_time <= new Date()) {
      throw new InvalidCallTimeException(newAppointment.user_id);
    }
    newAppointment.gender =
      (newAppointment.gender &&
        (newAppointment.gender === 'male' || newAppointment.gender === 'Male'
          ? 'M'
          : 'F')) ||
      null;

    // Query the other service to check the available slots in the Holidays and working days.
    const available_agents = await this.check_agent_availability(
      newAppointment.call_time,
      newAppointment.gender,
    );

    if (available_agents && available_agents.length <= 0)
      throw new AgentNotAvailableException(newAppointment.user_id);
    // End Section: Validating Input

    const [response] = await this.appointmentDB.create(
      {
        ...newAppointment,
        created_by: currentUser.id,
        updated_by: currentUser.id,
        tenant_id: currentUser.tenant_id,
        status: APPOINTMENT_STATUS.SCHEDULED,
      },
      output,
    );
    return response;
  }

  async findById(
    currentUser: ICurrentUser,
    id: string,
    output?: string[],
  ): Promise<Appointment> {
    const response = await this.appointmentDB.findOne(
      {
        id: id,
        deleted_on: null,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );
    if (!response) throw new AppointmentNotFoundException(id);

    return response;
  }

  async findByUserId(
    currentUser: ICurrentUser,
    user_id: string,
    output?: string[],
  ): Promise<Appointment> {
    const response = await this.appointmentDB.findOne(
      {
        user_id: user_id,
        tenant_id: currentUser.tenant_id,
        deleted_on: null,
      },
      output,
    );
    if (!response) throw new AppointmentNotFoundException(user_id);

    return response;
  }

  async findByIds(ids: readonly string[]): Promise<Appointment> {
    return this.appointmentDB.findByIds(ids);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async every_midnight_cron(): Promise<void> {
    console.log('Cron is running at Midnight.');

    // Get all Appointments for today.
    const start_date_time = moment();
    const end_date_time = moment(start_date_time).add(1, 'days');
    // Add a day to filter only 1 day appointments
    // end_date_time.setDate(end_date_time.getDate() + 1);

    // Take only dates to put filter on start of the day
    const start_date = start_date_time.toISOString().split('T')[0];
    const end_date = end_date_time.toISOString().split('T')[0];

    const appointments: Appointment[] = await this.appointmentDB.between(
      'call_time',
      start_date,
      end_date,
    );

    // Save all these in Redis instance
    const redis_client = await this.redisService.getClient(
      this.configService.REDIS.name,
    );
    const redis_response = redis_client.set(
      process.env.ENV_RBX_REDIS_KEY,
      JSON.stringify(appointments),
    );

    // Update Appointment status to QUEUED when saved in Redis
    if (redis_response == null) {
      // Send Priority Exception Message
    } else {
      const appointment_ids: string[] = appointments.map(appointment => {
        // Update DB status to Queued
        return appointment.id;
      });

      await this.appointmentDB.updateByIds(
        appointment_ids,
        {
          status: APPOINTMENT_STATUS.QUEUED,
        },
        ['id'],
      );
    }
  }

  // *   *   *   *   *   *
  // |   |   |   |   |   |
  // |   |   |   |   |   day of week
  // |   |   |   |   month
  // |   |   |   day of month
  // |   |   hour
  // |   minute
  // second (optional)
  @Cron('0 */1 * * * *')
  async cron_to_send_push_notification(): Promise<void> {
    console.log('Cron job is running every 1 minute.');
    const redis_client = await this.redisService.getClient(
      this.configService.REDIS.name,
    );

    const key_result = await redis_client.get(process.env.ENV_RBX_REDIS_KEY);
    if (!key_result) {
      return;
    }

    const appointments: Appointment[] = JSON.parse(key_result);

    // Filter the appointments under 15 minutes from Date.now()
    const appointments_coming = appointments.filter(appointment => {
      const diff_in_minutes = Math.round(
        moment.utc(appointment.call_time).diff(moment.utc(), 'minutes', true),
      );

      if (
        appointment.status === APPOINTMENT_STATUS.QUEUED &&
        diff_in_minutes >= 0 &&
        diff_in_minutes <=
          Number(
            this.configService.get(
              'ENV_RBX_MINUTES_BEFORE_CALL_TO_SEND_NOTIFICATION',
            ),
          )
      ) {
        return true;
      }
    });

    // Send Push Notification through the Notification Service.
    appointments_coming.forEach(async appointment => {
      console.log('Appointment Coming At:', appointment.call_time);

      // Send Push Notification
      const notification: PushNotificationModel = {
        platform: appointment.user.platform,
        device_id: appointment.user.device_id,
        token: appointment.user.firebase_token,
        message_title: 'Dummy: until get from Business Team.',
        message_body: 'Dummy: until get from Business Team.',
        image_url: 'http://lorempixel.com/400/200',
      };

      await this.send_push_notification(notification);

      // If success then
      if (true) {
        // Update Entry in Redis and Database with Status=Notification.
        // This is a Reference Object, So changing this item will update the List object as well.
        appointment.status = APPOINTMENT_STATUS.NOTIFICATION;

        // Updating in DB
        await this.appointmentDB.update(
          { id: appointment.id },
          {
            status: APPOINTMENT_STATUS.NOTIFICATION,
          },
          ['id'],
        );
      }
    });

    // Update only if there is any Notification Sent.
    if (appointments_coming.length > 0) {
      const redis_response = redis_client.set(
        process.env.ENV_RBX_REDIS_KEY,
        JSON.stringify(appointments),
      );
    }
  }

  async get_user_by_id_from_service(user_id: string): Promise<any> {
    const params = `query{
        result: findCustomerById(id: "${user_id}") {
        id
        email
        contact_no
        first_name
        middle_name
        last_name
        gender
      }
    }`;

    return this.gqlClient.client('ENV_RBX_IDX_BASE_URL').send(params);
  }

  private async check_agent_availability(
    call_time: Date,
    gender: string,
  ): Promise<any> {
    const query: string = `query{
        result: findAvailableUsers(input: ${toGraphQL({
          call_time,
          gender,
        })}){
        id
        email
        contact_no
        created_on
        updated_on
      }
    }`;

    return this.gqlClient.client('ENV_RBX_ENTITLEMENT_SERVER').send(query);
  }

  private async send_push_notification(input: PushNotificationModel) {
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

    return await this.gqlClient
      .client('ENV_RBX_NOTIFICATION_SERVER')
      .send(mutation);
  }
}
