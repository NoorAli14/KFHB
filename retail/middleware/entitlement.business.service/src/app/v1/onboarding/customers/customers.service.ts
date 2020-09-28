import { Injectable, Logger } from '@nestjs/common';
import { Customer } from './customer.entity';
import { GqlClientService } from '@common/index';

@Injectable()
export class CustomersService {
  private readonly logger: Logger = new Logger(CustomersService.name);
  private readonly output: string = `{
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

  constructor(private readonly gqlClient: GqlClientService) { }

  async findOne(id: string): Promise<Customer> {
    this.logger.log(`Start finding customer360 with ID [${id}]`);
    const query = `query {
      result: findCustomerById(id: "${id}") ${this.output}
    }`;
    const _query = `query {
      result:  findTemplateResponseByUserId(user_id: "${id}") {
        id
        user_id
        results
        remarks
        created_on
        updated_on
      }
    }`;
    const [customer, templates] = await Promise.all([
      this.gqlClient.send(query),
      this.gqlClient.send(_query),
    ]);
    customer.templates = templates?.[0] ? templates : [];
    return customer;
  }
}
