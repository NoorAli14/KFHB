import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { CustomersService } from './customers.service';

@Module({
    imports: [GqlClientModule],
    providers: [CustomersService, GqlClientService],
})
export class CustomerModule { }
