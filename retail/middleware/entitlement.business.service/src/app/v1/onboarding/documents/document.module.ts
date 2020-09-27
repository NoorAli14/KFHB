import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
    imports: [GqlClientModule],
    controllers: [DocumentsController],
    providers: [DocumentsService, GqlClientService],
})
export class DocumentModule { }
