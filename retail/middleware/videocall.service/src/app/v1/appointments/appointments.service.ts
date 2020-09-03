import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NewAppointmentInput } from './appointment.dto';
import { AppointmentRepository } from '@core/repository';

import { ConfigurationService } from '@common/configuration/configuration.service';
import { AppointmentGQL } from './appointment.model';
import * as moment from 'moment';

@Injectable()
export class AppointmentsService {
  private REDIS_KEY = 'rbx_call_appointments';

  constructor(
    private readonly appointmentDB: AppointmentRepository,
    private readonly configService: ConfigurationService,
    private readonly redisService: RedisService,
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

  private async appointment_limit_at_this_time(call_time: Date) {
    const appointments_at_this_time: any[] = await this.appointmentDB.findBy(
      {
        call_time: call_time,
      },
      ['id'],
    );

    return (
      appointments_at_this_time.length <
      parseInt(process.env.ENV_RBX_MAX_APPOINTMENTS_AT_A_TIME)
    );
  }

  async create(
    newAppointment: NewAppointmentInput,
    keys?: string[],
  ): Promise<any> {
    // Section: Validating Input
    // TODO: Validate the input and Time of the appointment
    // Check the Past date and time
    if (newAppointment.call_time <= new Date()) {
      throw new Error('Selected call time is in the Past.');
    }

    // Query the other service to check the available slots in the Holidays and working days.

    // End Section: Validating Input

    // Section: Check the Duplicate
    // TODO: Only if we want to allow limited number of appointment on a specific time.
    // this.appointment_limit_at_this_time(newAppointment.call_time)

    this.throw_if_appointment_exist(
      newAppointment.call_time,
      newAppointment.user_id,
    );
    // End Section: Check the Duplicate

    const [response] = await this.appointmentDB.create(newAppointment, keys);
    return response;
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.appointmentDB.findOne({ id: id }, keys);
  }

  async findByIds(ids: readonly string[]): Promise<any> {
    return this.appointmentDB.findByIds(ids);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async every_midnight_cron(): Promise<void> {
    console.log('Cron is running at Midnight.');
    // TODO: Get all Appointments for today.
    const start_date_time = new Date();
    const end_date_time = new Date(start_date_time);
    // Add a day to filter only 1 day appointments
    end_date_time.setDate(end_date_time.getDate() + 1);

    // Take only dates to put filter on start of the day
    const start_date = start_date_time.toISOString().split('T')[0];
    const end_date = end_date_time.toISOString().split('T')[0];

    const appointments = await this.appointmentDB.between(
      'call_time',
      start_date,
      end_date,
    );

    // TODO: Save all these in Redis instance
    const redis_client = await this.redisService.getClient(
      this.configService.REDIS.name,
    );
    redis_client.set(this.REDIS_KEY, JSON.stringify(appointments));

    // TODO: Register all dynamically into Cron library
    // OR: Create another Cron job and check for calls every minute in Redis (within MINUTES_BEFORE_CALL_TO_SEND_NOTIFICATION).
    // If Found send Push Notification right away.
  }

  // *   *   *   *   *   *
  // |   |   |   |   |   |
  // |   |   |   |   |   day of week
  // |   |   |   |   month
  // |   |   |   day of month
  // |   |   hour
  // |   minute
  // second (optional)
  // @Cron(`0 ${process.env.MINUTES_BEFORE_CALL_TO_SEND_NOTIFICATION} * * * *`)
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

    const appointments: AppointmentGQL[] = JSON.parse(key_result);

    // TODO: Filter the appointments under 15 minutes from Date.now()
    const appointments_coming = appointments.filter(appointment => {
      const diff_in_minutes = Math.round(
        moment.utc(appointment.call_time).diff(moment.utc(), 'minutes', true),
      );

      if (
        diff_in_minutes > 0 &&
        diff_in_minutes <=
          Number(process.env.MINUTES_BEFORE_CALL_TO_SEND_NOTIFICATION)
      ) {
        return true;
      }
    });

    // TODO: Send Push Notification through the Notification Service.
    appointments_coming.forEach(appointment => {
      console.log('Appointment Coming At:', appointment.call_time);

      // Send Push Notification
      // If success then
      // Update Entry in the Database with Status=Notification.
      // If success then
      // Remove entry from Redis.
    });
  }
}
