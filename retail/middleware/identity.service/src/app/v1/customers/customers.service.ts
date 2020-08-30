import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { IdentityService } from '@rubix/common/http/';
import { CustomerRepository } from '@rubix/core';
import { Customer } from './customer.model';

@Injectable()
export class CustomersService {
  private readonly logger: Logger = new Logger(CustomersService.name);
  constructor(
    private readonly identityService: IdentityService,
    private readonly customerDB: CustomerRepository,
  ) {}

  async create(
    input: { [key: string]: any },
    columns?: string[],
  ): Promise<Customer> {
    const [customer] = await this.customerDB.create(input, ['id', 'status']);
    const targetUser: any = await this.identityService.createUser(customer.id);
    const [_customer] = await this.customerDB.update(
      { id: customer.id },
      { target_user_id: targetUser.id },
      columns,
    );
    return _customer;
  }

  async findById(id: string, keys?: string[]): Promise<Customer> {
    return this.customerDB.findOne({ id: id }, keys);
  }
}
