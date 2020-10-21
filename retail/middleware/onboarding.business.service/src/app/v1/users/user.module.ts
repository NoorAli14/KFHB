import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { UserService } from './users.service';
import { AppointmentsService } from './appointments/appointments.service';
import { UsersController } from './users.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [UsersController],
  providers: [UserService, AppointmentsService, GqlClientService],
})
export class UserModule { }
