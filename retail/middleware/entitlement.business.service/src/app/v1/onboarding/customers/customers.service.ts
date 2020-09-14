import { Injectable, Logger } from '@nestjs/common';
import { Customer } from './customer.entity';
import { GqlClientService } from '@common/index';
import { IHEADER } from '@common/interfaces';

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

  constructor(private readonly gqlClient: GqlClientService) {}

  async findOne(header: IHEADER, id: string): Promise<Customer> {
    this.logger.log(`Start finding customer360 with ID [${id}]`);
    const query: string = `query {
      result: findCustomerById(id: "${id}") ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }
}
