import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { AppointmentGQL, UserGQL } from './appointment.model';
import { NewAppointmentInput } from './appointment.dto';
import { Fields } from '@common/decorators';
import { PLATFORMS } from '@common/constants';

@Resolver(AppointmentGQL)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ResolveField(() => UserGQL)
  async user(
    @Fields(UserGQL) columns: string[],
    @Parent() appointment: AppointmentGQL,
  ): Promise<UserGQL> {
    // Query API call to get the User data from another Service.
    const user = this.appointmentsService.get_user_by_id_from_service(
      appointment.user_id,
    );

    return (
      user || {
        id: appointment.user_id,
        first_name: 'first name',
        middle_name: 'middle name',
        last_name: 'last name',
        email: 'email',
        device_id: '4947-9df4-23a5fcf659',
        firebase_token:
          'dr4qn-2yxUhEv6hW6PJ5A3:APA91bG3Y1rVLTmuVlYKxb82P4LUEnYO45dqffuFTouAZSVDsCl05sO0OWNIgZPpubC7lsv8Sf5g9pI6yTuvRd8cMU1UU-z4ZQafH8EIVZxx4xmI0US3TkO2EUl6I6pg2KK8UCUPZUfK',
        platform: PLATFORMS.IOS,
        username: 'username',
        created_on: new Date(),
        updated_on: new Date(),
      }
    );
  }

  @Mutation(() => AppointmentGQL)
  async addAppointment(
    @Args('appointment') appointment: NewAppointmentInput,
    @Fields(AppointmentGQL) columns: string[],
  ): Promise<AppointmentGQL> {
    return this.appointmentsService.create(appointment, columns);
  }

  @Query(() => AppointmentGQL)
  async findAppointment(
    @Args('appointment_id') appointment_id: string,
    @Fields(AppointmentGQL) columns: string[],
  ): Promise<AppointmentGQL> {
    return this.appointmentsService.findById(appointment_id, columns);
  }

  @Query(() => AppointmentGQL)
  async findAppointmentByUserId(
    @Args('user_id') user_id: string,
    @Fields(AppointmentGQL) columns: string[],
  ): Promise<AppointmentGQL> {
    return this.appointmentsService.findByUserId(user_id, columns);
  }
}
