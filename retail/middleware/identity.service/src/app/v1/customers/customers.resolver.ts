import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, NotFoundException } from '@nestjs/common';
import {
  AuthGuard,
  Fields,
  CurrentUser,
  Tenant,
  DEFAULT_CREATED_BY,
  CUSTOMER_STATUSES,
} from '@rubix/common';
import { Customer } from './customer.model';
import { CustomersService } from './customers.service';
import { NewCustomerInput } from './customer.dto';

@Resolver(Customer)
export class CustomersResolver {
  constructor(private readonly customerService: CustomersService) {}

  @Mutation(() => Customer)
  addCustomer(
    @Args('input') input: NewCustomerInput,
    @CurrentUser() user: any,
    @Tenant() tenant: any,
    @Fields() columns: string[],
  ): Promise<Customer> {
    const params: any = {
      created_by: DEFAULT_CREATED_BY,
      updated_by: DEFAULT_CREATED_BY,
      tenant_id: tenant.id,
      email: input.email,
      status: CUSTOMER_STATUSES.PENDING,
    };
    return this.customerService.create(params, columns);
  }

  @Query(() => Customer)
  async findCustomerById(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<Customer> {
    const user: Customer = await this.customerService.findById(id, columns);
    if (!user) throw new NotFoundException('Customer Not Found');
    return user;
  }
}
