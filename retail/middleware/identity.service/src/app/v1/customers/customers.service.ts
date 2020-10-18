import { Injectable, Logger } from '@nestjs/common';
import { IdentityService } from '@rubix/common/connectors';
import { CustomerRepository } from '@rubix/core';
import {Customer, CustomerWithPagination} from './customer.model';
import {ICurrentUser, IQueryParams} from "@rubix/common";

@Injectable()
export class CustomersService {
  private readonly logger: Logger = new Logger(CustomersService.name);
  constructor(
    private readonly identityService: IdentityService,
    private readonly customerDB: CustomerRepository,
  ) {}

  async list(current_user: ICurrentUser, output: string[], queryParams: IQueryParams): Promise<CustomerWithPagination> {
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
