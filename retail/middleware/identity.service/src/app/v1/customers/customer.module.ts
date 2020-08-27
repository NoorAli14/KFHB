import { Module } from '@nestjs/common';
import {IdentityModule} from '@rubix/app/identity/identity.module'
import {IdentityService} from '@rubix/app/identity/identity.service'
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { CustomerRepository } from '@rubix/core/repository/';
import {CutomersService} from './cutomers.service';
import {CutomersResolver} from './cutomers.resolver'

@Module({
  imports: [RepositoryModule, IdentityModule],
  providers: [IdentityService, CustomerRepository, CutomersService, CutomersResolver]
})
export class CustomerModule {}
