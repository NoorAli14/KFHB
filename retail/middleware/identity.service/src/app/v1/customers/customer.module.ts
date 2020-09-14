import { Module } from '@nestjs/common';
import { IdentityModule } from '@rubix/common/connectors/identity/identity.module';
import { IdentityService } from '@rubix/common/connectors/identity/identity.service';

import { RepositoryModule, CustomerRepository } from '@rubix/core/repository/';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';

@Module({
  imports: [RepositoryModule, IdentityModule],
  providers: [
    IdentityService,
    CustomerRepository,
    CustomersService,
    CustomersResolver,
  ],
})
export class CustomerModule {}
