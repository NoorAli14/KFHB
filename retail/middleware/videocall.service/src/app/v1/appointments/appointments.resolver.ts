import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment, User } from './appointment.model';
import { NewAppointmentInput } from './appointment.dto';
import { Fields } from '@common/decorators';
import { PLATFORMS } from '@common/constants';

@Resolver(Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ResolveField(() => User)
  async user(
    @Fields(User) columns: string[],
    @Parent() appointment: Appointment,
  ): Promise<User> {
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

  @Mutation(() => Appointment)
  async addAppointment(
    @Args('appointment') appointment: NewAppointmentInput,
    @Fields(Appointment) columns: string[],
  ): Promise<Appointment> {
    return this.appointmentsService.create(appointment, columns);
  }

  @Query(() => Appointment)
  async findAppointment(
    @Args('appointment_id') appointment_id: string,
    @Fields(Appointment) columns: string[],
  ): Promise<Appointment> {
    return this.appointmentsService.findById(appointment_id, columns);
  }

  @Query(() => Appointment)
  async findAppointmentByUserId(
    @Args('user_id') user_id: string,
    @Fields(Appointment) columns: string[],
  ): Promise<Appointment> {
    return this.appointmentsService.findByUserId(user_id, columns);
  }
}
