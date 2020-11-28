import { Module } from '@nestjs/common';
import { AttachmentsResolver } from './attachments.resolver';
import { AttachmentsService } from './attachments.service';
import { AttachmentRepository } from '@core/repository';

@Module({
  providers: [AttachmentsResolver, AttachmentsService, AttachmentRepository],
})
export class AttachmentsModule {}
