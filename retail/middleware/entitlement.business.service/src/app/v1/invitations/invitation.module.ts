import { Module } from '@nestjs/common';
import { InvitationsController } from './invitations.controller';
import { UserService } from '@app/v1/users/users.service';

@Module({
  imports: [],
  controllers: [InvitationsController],
  providers: [UserService],
})
export class InvitationModule {}
