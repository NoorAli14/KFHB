import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { GqlClientService, PAGINATION_OUTPUT, toGraphql } from '@common/index';
import { Customer, CustomerPaginationList } from './customer.entity';
import { CreateCustomerInput } from './customer.interface';

@Injectable()
export class CustomersService {
  private readonly logger: Logger = new Logger(CustomersService.name);
  private readonly output: string = `{
    id
    tenant_id
    session_id
    first_name
    last_name
    contact_no
    email
    date_of_birth
    national_id_no
    national_id_expiry
    nationality
    nationality_code
    fcm_token_id
    device_id
    platform
    gender
    last_step
    status
    created_on
    created_by
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async create(input: CreateCustomerInput): Promise<Customer> {
    this.logger.log(`Start registering a new customer`);
    // const user: User = await this.findByEmail(input.email);
    // if (user) {
    //   throw new UnprocessableEntityException(
    //     `User Already Exist with email ${input.email}`,
    //   );
    // }
    const mutation = `mutation {
      result: addCustomer(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async findOne(id: string, output?: string): Promise<Customer> {
    this.logger.log(`Find customer with ID [${id}]`);
    const _output: string = output ? output : this.output;
    const query = `query {
      result: findCustomerById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.send(query);
  }

  async find360(id: string): Promise<Customer> {
    const output = `{
      id
      session_id
      first_name
      middle_name
      last_name
      contact_no
      date_of_birth
      device_id
      platform
      email
      national_id_no
      national_id_expiry
      nationality_code
      nationality
      documents {
          id
          name
          processed_data
          status
          created_by
          created_on
          updated_by
          updated_on
      }
      status
      created_on
      created_by
      updated_on
      updated_by
    }`;
    return this.findOne(id, output);
  }

  async update(id: string, input: any): Promise<Customer> {
    const user: Customer = await this.findOne(id, `{id}`);
    if (!user) {
      throw new NotFoundException('Customer Not Found');
    }
    const mutation = `mutation {
      result: updateCustomer(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async list(params?: any): Promise<CustomerPaginationList> {
    this.logger.log(`Start fetching a list of paginated customers`);
    this.logger.log(params);
    const query = `query {
      result: customersList(
        filters: ${toGraphql(params?.filters)},
        sort_by: ${toGraphql(params?.sort_by)},
        pagination: ${toGraphql(params?.pagination)}
      ) {
        pagination ${PAGINATION_OUTPUT}
        data ${this.output}
      }
    }`;
    return this.gqlClient.send(query);
  }

  async updateLastStep(id: string, lastStep: string): Promise<Customer> {
    return this.update(id, { last_step: lastStep });
  }
}
