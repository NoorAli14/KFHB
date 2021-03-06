import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField, Query,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  Fields,
  Tenant,
  CREATED_BY,
  CUSTOMER_STATUSES, CurrentUser, ICurrentUser,
} from '@rubix/common';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { Document } from '@rubix/app/v1/documents/document.model';

import {Customer, CustomerWithPagination} from './customer.model';
import { CustomersService } from './customers.service';
import {NewCustomerInput, UpdateCustomerInput} from './customer.dto';
import {CustomerNotFoundException} from "@app/v1/customers/exceptions";
import {PaginationParams, SortingParam} from "@common/dtos";
import {CustomersFilterParams} from "@app/v1/customers/dtos";

@Resolver(Customer)
export class CustomersResolver {
  constructor(private readonly customerService: CustomersService) {}

  @Query(() => CustomerWithPagination)
  async customersList(
      @CurrentUser() currentUser: ICurrentUser,
      @Args('pagination', {nullable: true}) paginationParams: PaginationParams,
      @Args('filters', {nullable: true}) filteringParams: CustomersFilterParams,
      @Args('sort_by', {nullable: true}) sortingParams: SortingParam,
      @Fields() output: string[]
  ): Promise<CustomerWithPagination> {
    return this.customerService.list(currentUser, paginationParams, filteringParams, sortingParams, output);
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

  @Mutation(() => Customer)
  async updateCustomer(
      @Args('id') id: string,
      @Args('input') input: UpdateCustomerInput,
      @Fields() output: string[],
      @CurrentUser() current_user: ICurrentUser,
  ): Promise<Customer> {
    const customer: Customer = await this.customerService.findById(current_user, id,['id']);
    if(!customer) throw new CustomerNotFoundException(id);
    return this.customerService.update(current_user, id, input, output);
  }

  @UseGuards(AuthGuard)
  @Query(() => Customer)
  async findCustomerById(
    @Args('id') id: string,
    @CurrentUser() current_user: ICurrentUser,
    @Fields() output: string[],
  ): Promise<Customer> {
    const customer: Customer = await this.customerService.findById(current_user, id, output);
    if(!customer) throw new CustomerNotFoundException(id);
    return customer;
  }

  @UseGuards(AuthGuard)
  @Query(() => Customer)
  async findCustomerByCorporateIds(
    @Args('entity_id') entity_id: string,
    @Args('entity_member_id') entity_member_id: string,
    @CurrentUser() current_user: ICurrentUser,
    @Fields() output: string[],
  ): Promise<Customer> {
    const customer: Customer = await this.customerService.findByCorporateIds(
      current_user,
      entity_id,
      entity_member_id,
      output,
    );
    if(!customer) throw new CustomerNotFoundException(entity_member_id);
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
