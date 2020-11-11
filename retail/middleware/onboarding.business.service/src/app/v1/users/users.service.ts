import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql } from '@common/index';
import { User } from './user.entity';
import { CheckAvailabilityInput } from './user.dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  private readonly output: string = `{
    id
    first_name
    middle_name
    last_name
    email
    contact_no
    gender
    status
    created_by
    created_on
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async availableAgents(input: CheckAvailabilityInput): Promise<User[]> {
    this.logger.log(`Agent:: Start find available agents at [${input.call_time}]`);
    const query = `query {
      result: findAvailableAgents(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(query);
  }

  async findOne(id: string): Promise<User> {
    const output = ` {
      id
      first_name
      middle_name
      last_name
      email
      contact_no
      gender
      nationality_id
      date_of_birth
      roles {
        id
        name
        description
        status
        created_on
        created_by
      }
      modules {
          id
          name
          slug
          parent_id
          sub_modules {
            id
            name
            slug
            parent_id
            permissions {
              id
              record_type
              created_on
              created_by
            }
            status
            created_on
            created_by
          }
          permissions {
            id
            record_type
            created_on
            created_by
          }
          status
          created_on
          created_by
        }
      status
      created_on
      created_by
      updated_on
      updated_by
    }`;

    const query = `query {
      result: findUserById(id: "${id}") ${output}
    }`;
    return this.gqlClient.send(query);
  }
}
