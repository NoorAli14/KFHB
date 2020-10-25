import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewAppointmentInput } from './appointment.dto';
import { AppointmentRepository } from '@core/repository';

import { ConfigurationService } from '@common/configuration/configuration.service';
import { Appointment, UserGQL } from './appointment.model';
import { APPOINTMENT_STATUS, USER_QUERY } from '@common/constants';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { EmailService, PushNotificationService } from '@common/connectors';

import { iPushNotification } from '@common/connectors/notification/interfaces/push_notification.interface';
import { toGraphQL } from '@common/utilities';
import { ICurrentUser } from '@common/interfaces';
import {
  InvalidCallTimeException,
  AgentNotAvailableException,
  AppointmentNotFoundException,
  MaxAppointLimitReachException,
  AppointmentAlreadyExistException,
} from './exceptions';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentDB: AppointmentRepository,
    private readonly configService: ConfigurationService,
    private readonly gqlClient: GqlClientService,
    private readonly emailService: EmailService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  private async throw_if_appointment_exist(
    currentUser: ICurrentUser,
    call_time: Date,
    user_id: string,
  ) {
    const record = await this.appointmentDB.findOne(
      {
        user_id: user_id,
        deleted_on: null,
        call_time: call_time,
        tenant_id: currentUser.tenant_id,
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
      throw new MaxAppointLimitReachException('');
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
      currentUser,
      newAppointment.call_time,
      newAppointment.user_id,
    );
    // End Section: Check the Duplicate

    // Check the Past date and time
    if (newAppointment.call_time <= new Date()) {
      throw new InvalidCallTimeException(newAppointment.user_id);
    }

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

    const user = await this.get_user_by_id_from_service(newAppointment.user_id);
    /**
     *
     * Getting email of all available agents
     * Calling other service to send email to available agent
     *
     */
    this.emailService.send_email_to_agents(
      available_agents.map((item: UserGQL) => item.email),
      newAppointment.user_id,
      `${user.first_name} ${user.last_name}`,
      newAppointment.call_time,
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

  // *   *   *   *   *   *
  // |   |   |   |   |   |
  // |   |   |   |   |   day of week
  // |   |   |   |   month
  // |   |   |   day of month
  // |   |   hour
  // |   minute
  // second (optional)
  @Cron(`0 */${process.env.ENV_RBX_CRON_JOB_TIME} * * * *`)
  async cron_to_send_push_notification(): Promise<void> {
    console.log('Cron job is running every 15 minute.');
    // Get all Appointments of next 15 minutes.
    const start_date_time = moment();
    const end_date_time = moment(start_date_time).add(
      this.configService.VCALL.ENV_RBX_CRON_JOB_TIME,
      'minutes',
    );

    // Take only dates to put filter on start of the day
    const start_date = start_date_time.toISOString().split('T')[0];
    const end_date = end_date_time.toISOString().split('T')[0];

    const appointments: Appointment[] = await this.appointmentDB.between(
      'call_time',
      start_date,
      end_date,
      ['id', 'call_time', 'gender', 'status'],
    );

    if (appointments && appointments.length <= 0) return;

    // Filter the appointments under 15 minutes from Date.now()
    const appointments_coming = appointments.filter(appointment => {
      const diff_in_minutes = Math.round(
        moment.utc(appointment.call_time).diff(moment.utc(), 'minutes', true),
      );

      if (
        (appointment.status === APPOINTMENT_STATUS.QUEUED ||
          appointment.status === APPOINTMENT_STATUS.SCHEDULED) &&
        diff_in_minutes >= 0 &&
        diff_in_minutes <=
          Number(this.configService.VCALL.ENV_RBX_CRON_JOB_TIME)
      ) {
        return true;
      }
    });

    // Send Push Notification through the Notification Service.
    appointments_coming.forEach(async appointment => {
      console.log('Appointment Coming At:', appointment.call_time);

      // Send Push Notification
      const notification: iPushNotification = {
        platform: appointment.user.platform,
        device_id: appointment.user.device_id,
        token: appointment.user.fcm_token_id,
        message_title: this.configService.VCALL
          .ENV_RBX_NOTIFICATION_MESSAGE_TITLE,
        message_body: this.configService.VCALL
          .ENV_RBX_NOTIFICATION_MESSAGE_BODY,
        image_url: this.configService.VCALL.ENV_RBX_NOTIFICATION_IMAGE_URL,
      };

      const send_notification = await this.pushNotificationService.send_push_notification(
        notification,
      );

      // If success then
      if (send_notification) {
        // Update Entry in Redis and Database with Status=Notification.
        // This is a Reference Object, So changing this item will update the List object as well.
        appointment.status = APPOINTMENT_STATUS.NOTIFICATION;
        // Updating in DB
        await this.appointmentDB.update(
          {
            id: appointment.id,
          },
          {
            status: APPOINTMENT_STATUS.NOTIFICATION,
          },
          ['id'],
        );
      } // else {
      //throw new SentNotificationFailedException(appointment.user.id);
      //}
    });
  }

  async get_user_by_id_from_service(user_id: string): Promise<any> {
    const params = `query{
        result: findCustomerById(id: "${user_id}") {${USER_QUERY}}
    }`;

    return this.gqlClient.client('ENV_RBX_IDX_BASE_URL').send(params);
  }

  private async check_agent_availability(
    call_time: Date,
    gender: string,
  ): Promise<any> {
    const query = `query{
        result: findAvailableAgents(input: ${toGraphQL({
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
}
