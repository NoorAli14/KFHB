import { Module } from '@nestjs/common';
import { IdentityModule, IdentityService } from '@rubix/common';
import { RepositoryModule, CustomerRepository } from '@rubix/core';
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
