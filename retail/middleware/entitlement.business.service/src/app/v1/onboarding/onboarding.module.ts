import { Module } from '@nestjs/common';

import { CustomerModule } from './customers/customer.module';
import { DocumentModule } from './documents/document.module';
// import { UserService } from './users.service';

@Module({
  imports: [CustomerModule, DocumentModule],
  //   controllers: [UsersController],
  //   providers: [UsersController, UserService, GqlClientService],
})
export class OnboardingModule { }
