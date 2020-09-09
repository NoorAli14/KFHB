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
  Tenant,
  CREATED_BY,
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
    @Tenant() tenant: any,
    @Fields() columns: string[],
  ): Promise<Customer> {
    const params: any = {
      created_by: CREATED_BY.API,
      updated_by: CREATED_BY.API,
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
    const customer: Customer = await this.customerService.findById(id, columns);
    if (!customer) throw new NotFoundException('Customer Not Found');
    return customer;
  }
}
