import { Module } from '@nestjs/common';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from './appointments.service';
import { AppointmentRepository } from '@core/repository';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';

@Module({
  imports: [GqlClientModule],
  providers: [AppointmentsResolver, AppointmentsService, AppointmentRepository],
})
export class AppointmentsModule {}
