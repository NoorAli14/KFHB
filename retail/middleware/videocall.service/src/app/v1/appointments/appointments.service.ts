import { HttpService, Injectable, Logger } from '@nestjs/common';
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
import { stringifyForGQL } from '@common/utilities';
import { ICurrentUser } from '@common/interfaces';
import { HttpHeaders } from '@core/context';

@Injectable()
export class AppointmentsService {
  private readonly logger: Logger = new Logger(AppointmentsService.name);

  private REDIS_KEY = 'rbx_call_appointments';

  constructor(
    private readonly appointmentDB: AppointmentRepository,
    private readonly configService: ConfigurationService,
    private readonly redisService: RedisService,
    private readonly gqlClient: GqlClientService,
  ) {}

  private async throw_if_appointment_exist(call_time: Date, user_id: string) {
    const record = this.appointmentDB.findOne(
      {
        call_time: call_time,
        user_id: user_id,
      },
      ['id'],
    );

    if (record) throw new Error('Appointment for this user already exist.');
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
    newAppointment: NewAppointmentInput,
    keys?: string[],
  ): Promise<any> {
    // Section: Validating Input
    // Validate the input and Time of the appointment
    // Check the Past date and time
    if (newAppointment.call_time <= new Date()) {
      throw new Error('Selected call time is in the Past.');
    }

    // Query the other service to check the available slots in the Holidays and working days.
    const agents = await this.check_agent_availability(
      newAppointment.call_time,
      newAppointment.gender,
    );

    // End Section: Validating Input

    // Section: Check the Duplicate
    // TODO: Only if we want to allow limited number of appointment on a specific time.
    // this.throw_if_appointment_limit_exceed(newAppointment.call_time)

    this.throw_if_appointment_exist(
      newAppointment.call_time,
      newAppointment.user_id,
    );
    // End Section: Check the Duplicate

    const [response] = await this.appointmentDB.create(newAppointment, keys);
    return response;
  }

  async findById(
    currentUser: ICurrentUser,
    id: string,
    output?: string[],
  ): Promise<any> {
    return this.appointmentDB.findOne(
      {
        id: id,
        deleted_on: null,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );
  }

  async findByUserId(
    currentUser: ICurrentUser,
    user_id: string,
    output?: string[],
  ): Promise<any> {
    return this.appointmentDB.findOne(
      {
        user_id: user_id,
        tenant_id: currentUser.tenant_id,
        deleted_on: null,
      },
      output,
    );
  }

  async findByIds(ids: readonly string[]): Promise<any> {
    return this.appointmentDB.findByIds(ids);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async every_midnight_cron(): Promise<void> {
    console.log('Cron is running at Midnight.');

    // Get all Appointments for today.
    const start_date_time = new Date();
    const end_date_time = new Date(start_date_time);
    // Add a day to filter only 1 day appointments
    end_date_time.setDate(end_date_time.getDate() + 1);

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
      this.REDIS_KEY,
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

      this.appointmentDB.updateByIds(
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

    const key_result = await redis_client.get(this.REDIS_KEY);
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
    appointments_coming.forEach(appointment => {
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

      const user_id = appointment.user_id;

      this.send_push_notification(notification, user_id);

      // If success then
      if (true) {
        // Update Entry in Redis and Database with Status=Notification.
        // This is a Reference Object, So changing this item will update the List object as well.
        appointment.status = APPOINTMENT_STATUS.NOTIFICATION;

        // Updating in DB
        this.appointmentDB.update(
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
        this.REDIS_KEY,
        JSON.stringify(appointments),
      );
    }
  }

  async get_user_by_id_from_service(user_id: string) {
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

  private async check_agent_availability(call_time: Date, gender: string) {
    const params = `query{
        result: findAvailableUsers(input:{call_time: ${call_time}, gender: ${gender}}){
        id
        email
      }
    }`;

    return this.gqlClient.client('ENV_RBX_ENTITLEMENT_SERVER').send(params);
  }

  private async send_push_notification(
    input: PushNotificationModel,
    user_id: string,
  ) {
    const keys = stringifyForGQL(input);

    const mutation: string = `mutation {
      result: sendPushNotification(input: ${keys}) {
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
