import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Module({
  imports: [GqlClientModule],
  controllers: [UsersController],
  providers: [UsersController, UserService, GqlClientService],
})
export class UserModule {}
