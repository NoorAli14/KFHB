import { Module } from '@nestjs/common';

import { CustomerModule } from './customers/customer.module';
// import { UserService } from './users.service';

@Module({
  imports: [CustomerModule],
  //   controllers: [UsersController],
  //   providers: [UsersController, UserService, GqlClientService],
})
export class OnboardingModule {}
