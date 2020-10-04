import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { AmlService } from './aml.service';
import { AmlController } from './aml.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [AmlController],
  providers: [AmlService, GqlClientService],
})
export class AmlModule { }
