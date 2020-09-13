import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [GqlClientModule],
  // controllers: [UsersController],
  providers: [UserService, GqlClientService],
})
export class UserModule {}
