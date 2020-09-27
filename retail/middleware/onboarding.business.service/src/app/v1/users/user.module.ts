import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { UserService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [UsersController],
  providers: [UserService, GqlClientService],
})
export class UserModule { }
