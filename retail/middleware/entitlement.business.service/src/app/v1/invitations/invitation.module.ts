import { Module } from '@nestjs/common';
import { RolesController } from './invitations.controller';
import { InvitationService } from './invitations.service';
@Module({
  imports: [],
  controllers: [RolesController],
  providers: [RolesController, InvitationService],
})
export class InvitationModule {}
