import { Injectable, Logger } from '@nestjs/common';
import { IdentityService } from '@rubix/common';

// import { generateRandomString } from '@rubix/common/utilities';
import { CustomerRepository } from '@rubix/core';
import { Customer } from './customer.model';
@Injectable()
export class CustomersService {
  constructor(
    private readonly identityService: IdentityService,
    private readonly customerDB: CustomerRepository,
  ) {}
  async create(input: { [key: string]: any }, columns?: string[]) {
    try {
      const [customer] = await this.customerDB.create(input, columns);
      return customer;
    } catch (error) {
      throw error;
    }
    // const user: any = await this.identityService.createUser('1234');
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.customerDB.findOne({ id: id }, keys);
  }
}
