import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';


@Module({
    imports: [GqlClientModule],
    controllers: [AttachmentsController],
    providers: [GqlClientService, AttachmentsService],
})
export class AttachmentModule { }
