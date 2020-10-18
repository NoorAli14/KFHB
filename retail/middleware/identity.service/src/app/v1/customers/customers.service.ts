import { Injectable, Logger } from '@nestjs/common';
import { IdentityService } from '@rubix/common/connectors';
import { CustomerRepository } from '@rubix/core';
import {Customer, CustomerWithPagination} from './customer.model';
import {ICurrentUser} from "@rubix/common";
import {ICustomerQueryParams} from "@app/v1/customers/interfaces";
import {CreatedOnStartAndEndBePresentException} from "@app/v1/customers/exceptions/created-on-start-and-end-be-present";
import {CreatedOnStartShouldBeLessThanEndException} from "@app/v1/customers/exceptions/created-on-start-should-be-less-than-end";
import {isISO8601} from "class-validator";
import {TimeShouldBeAnISOStringException} from "@app/v1/customers/exceptions";

@Injectable()
export class CustomersService {
  private readonly logger: Logger = new Logger(CustomersService.name);
  constructor(
    private readonly identityService: IdentityService,
    private readonly customerDB: CustomerRepository,
  ) {}

  async list(current_user: ICurrentUser, output: string[], queryParams: ICustomerQueryParams): Promise<CustomerWithPagination> {
    if(queryParams.created_on_start){
      if(!isISO8601(queryParams.created_on_start, {strict: true})){
        throw new TimeShouldBeAnISOStringException(queryParams.created_on_start);
      }
      if(!queryParams.created_on_end){
        throw new CreatedOnStartAndEndBePresentException(queryParams.created_on_start, queryParams.created_on_end)
      } else if(!isISO8601(queryParams.created_on_end, {strict: true})){
        throw new TimeShouldBeAnISOStringException(queryParams.created_on_end);
      }
    }
    if(new Date(queryParams.created_on_start).getTime() > new Date(queryParams.created_on_end).getTime()){
      throw new CreatedOnStartShouldBeLessThanEndException(queryParams.created_on_start, queryParams.created_on_end);
    }
    return this.customerDB.listWithPagination(queryParams, output, { deleted_on: null, tenant_id: current_user.tenant_id });
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

  async findById(id: string, output: string[]): Promise<Customer> {
    return this.customerDB.findOne({ id: id }, output);
  }
}
