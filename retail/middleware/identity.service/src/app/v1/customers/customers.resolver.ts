import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@rubix/common/guards';
import { Fields, CurrentUser, Tenant } from '@rubix/common/decorators';
import { Customer } from './customer.model';
import { CustomersService } from './customers.service';
import { NewCustomerInput } from './customer.dto';

@Resolver(Customer)
@UseGuards(AuthGuard)
export class CustomersResolver {
  constructor(private readonly customerService: CustomersService) {}
}

@Mutation(() => Customer)
  addSession(
    @Args('input') input: NewCustomerInput,
    @CurrentUser() user: any,
    @Tenant() tenant: any,
    @Fields() columns: string[],
  ): Promise<Session> {
    const params: Session = {
      user_id: user.id,
      tenant_id: tenant.id,
      reference_id: input.reference_id,
      status: 'ACTIVE',
      created_by: user.id,
      updated_by: user.id,
    };
    return this.sessionService.create(params, columns);
  }