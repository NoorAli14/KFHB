import { Module } from '@nestjs/common';
import { InvitationsController } from './invitations.controller';
import { UserService } from '@app/v1/users/users.service';
import { UserModule } from '@app/v1/users/users.module';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Module({
  imports: [UserModule, GqlClientModule],
  controllers: [InvitationsController],
  providers: [UserService, GqlClientService],
})
export class InvitationModule {}
