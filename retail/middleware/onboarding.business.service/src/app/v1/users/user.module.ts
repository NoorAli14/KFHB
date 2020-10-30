import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { UserService } from './users.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { UsersController } from './users.controller';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [GqlClientModule],
  controllers: [UsersController],
  providers: [UserService, AppointmentsService, GqlClientService, CustomersService],
})
export class UserModule {}
