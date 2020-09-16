import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql, IHEADER } from '@common/index';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  private readonly output: string = `{
    id
    first_name
    last_name
    contact_no
    email
    date_of_birth
    national_id_no
    national_id_expiry
    nationality
    nationality_code
    gender
    status
    created_on
    created_by
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async create(header: IHEADER, input: any): Promise<User> {
    this.logger.log(`Start registering a new customer`);
    // const user: User = await this.findByEmail(input.email);
    // if (user) {
    //   throw new UnprocessableEntityException(
    //     `User Already Exist with email ${input.email}`,
    //   );
    // }
    const mutation: string = `mutation {
      result: addCustomer(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async findOne(header: IHEADER, id: string, output?: string): Promise<User> {
    this.logger.log(`Find customer with ID [${id}]`);
    const _output: string = output ? output : this.output;
    const query: string = `query {
      result: findCustomerById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async update(header: IHEADER, id: string, input: any): Promise<User> {
    const user: User = await this.findOne(header, id, `{id}`);
    if (!user) {
      throw new NotFoundException('Customer Not Found');
    }
    const mutation: string = `mutation {
      result: updateCustomer(id: "${id}", input: ${toGraphql(input)}) ${
      this.output
    }
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
