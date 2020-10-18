import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField, GraphQLExecutionContext, Context,
} from '@nestjs/graphql';
import { UseGuards, NotFoundException } from '@nestjs/common';
import {
  AuthGuard,
  Fields,
  Tenant,
  CREATED_BY,
  CUSTOMER_STATUSES, CurrentUser, ICurrentUser, QueryParams, IQueryParams
} from '@rubix/common';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { Document } from '@rubix/app/v1/documents/document.model';

import {Customer, CustomerWithPagination} from './customer.model';
import { CustomersService } from './customers.service';
import { NewCustomerInput } from './customer.dto';

@Resolver(Customer)
export class CustomersResolver {
  constructor(private readonly customerService: CustomersService) {}

  @Query(() => CustomerWithPagination)
  async customersList(
      @Fields() output: string[],
      @Context() context: GraphQLExecutionContext,
      @CurrentUser() currentUser: ICurrentUser,
      @QueryParams() queryParams: IQueryParams,
  ): Promise<CustomerWithPagination> {
    return this.customerService.list(currentUser, output, queryParams);
  }

  @Mutation(() => Customer)
  addCustomer(
    @Args('input') input: NewCustomerInput,
    @Tenant() tenant: any,
    @Fields() output: string[],
  ): Promise<Customer> {
    const params: any = {
      ...input,
      created_by: CREATED_BY.API,
      updated_by: CREATED_BY.API,
      tenant_id: tenant.id,
      status: CUSTOMER_STATUSES.PENDING,
    };
    return this.customerService.create(params, output);
  }

  @UseGuards(AuthGuard)
  @Query(() => Customer)
  async findCustomerById(
    @Args('id') id: string,
    @Fields() output: string[],
  ): Promise<Customer> {
    const customer: Customer = await this.customerService.findById(id, output);
    if (!customer) throw new NotFoundException('Customer Not Found');
    return customer;
  }

  @ResolveField(() => [Document])
  documents(
    @Parent() customer: Customer,
    @Loader('DocumentLoader') postLoader: DataLoader<Document['id'], Document>,
  ) {
    console.log(`Session IDs: ${customer.session_id}`);
    if (!customer.session_id) return [];

    return postLoader.load(customer.session_id);
  }
}
