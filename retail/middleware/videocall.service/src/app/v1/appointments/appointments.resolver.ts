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

@Resolver(AppointmentGQL)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ResolveField(() => UserGQL)
  async user(
    @Fields(UserGQL) columns: string[],
    @Parent() appointment: AppointmentGQL,
  ): Promise<UserGQL> {
    // TODO: Axios API call to get the User data from another Service.

    return {
      id: appointment.user_id,
      first_name: 'first name',
      middle_name: 'middle name',
      last_name: 'last name',
      email: 'email',
      username: 'username',
      created_on: new Date(),
      updated_on: new Date(),
    };
  }

  @Mutation(() => AppointmentGQL)
  async addAppointment(
    @Args('input') input: NewAppointmentInput,
    @Fields(AppointmentGQL) columns: string[],
  ): Promise<AppointmentGQL> {
    return this.appointmentsService.create(input, columns);
  }

  @Query(() => AppointmentGQL)
  async findAppointment(
    @Args('id') id: string,
    @Fields(AppointmentGQL) columns: string[],
  ): Promise<AppointmentGQL> {
    return this.appointmentsService.findById(id, columns);
  }
}
