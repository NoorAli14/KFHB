import { Injectable, Logger } from '@nestjs/common';
import { IdentityService } from '@rubix/common/connectors';
import { CustomerRepository } from '@rubix/core';
import {Customer, CustomerWithPagination} from './customer.model';
import {ICurrentUser} from "@rubix/common";
import {CustomersFilterParams} from "@app/v1/customers/classes";
import {CreatedOnStartShouldBeLessThanEndException} from "@app/v1/customers/exceptions/created-on-start-should-be-less-than-end";
import {UpdateCustomerInput} from "@app/v1/customers/customer.dto";
import {PaginationParams, SortingParam} from "@common/classes";

@Injectable()
export class CustomersService {
  private readonly logger: Logger = new Logger(CustomersService.name);
  constructor(
    private readonly identityService: IdentityService,
    private readonly customerDB: CustomerRepository,
  ) {}

  async list(current_user: ICurrentUser,
             paginationParams: PaginationParams,
             filteringParams: CustomersFilterParams,
             sortingParams: SortingParam[],
             output: string[]): Promise<CustomerWithPagination> {
    if(filteringParams.created_on && (new Date(filteringParams.created_on.start).getTime() > new Date(filteringParams.created_on.end).getTime())){
      throw new CreatedOnStartShouldBeLessThanEndException(filteringParams.created_on.start, filteringParams.created_on.end);
    }
    return this.customerDB.list(paginationParams, filteringParams, sortingParams, { deleted_on: null, tenant_id: current_user.tenant_id }, output);
  }

  async create(
    input: { [key: string]: any },
    output: string[],
  ): Promise<Customer> {
    const [customer] = await this.customerDB.create(input, output);
    // const [_customer] = await this.customerDB.update(
    //   { id: customer.id },
    //   { target_user_id: targetUser.id },
    //   columns,
    // );
    return customer;
  }

  async findById(currentUser: ICurrentUser, id: string, output?: string[]): Promise<Customer> {
    return this.customerDB.findOne({ id: id, deleted_on: null, tenant_id: currentUser.tenant_id }, output);
  }

  async update(
      current_user: ICurrentUser,
      id: string,
      input: UpdateCustomerInput,
      output?: string[],
  ): Promise<Customer> {
    const [result] = await this.customerDB.update(
        { id: id, deleted_on : null, tenant_id: current_user.tenant_id},
        {...input, ...{updated_by: current_user.id}}, output);
    return result;
  }
}
