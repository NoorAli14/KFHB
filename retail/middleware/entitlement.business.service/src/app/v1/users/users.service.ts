import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './user.entity';
import { GqlClientService, toGraphql } from '@common/index';

@Injectable()
export class UserService {
  private readonly output: string = ` {
    id
    first_name
    middle_name
    last_name
    username
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
        parent_id
        sub_modules {
          id
          name
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

  constructor(private readonly gqlClient: GqlClientService) {}

  async list(): Promise<User[]> {
    const params = `query {
      result: usersList {
        id
        first_name
        middle_name
        last_name
        username
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
        status
        created_on
        created_by
        updated_on
        updated_by
      }
    }`;
    return this.gqlClient.send(params);
  }

  async create(input: any): Promise<User> {
    const user: User = await this.findByEmail(input.email);
    if (user) {
      throw new UnprocessableEntityException(
        `User Already Exist with email ${input.email}`,
      );
    }
    const params = `mutation {
      result: addUser(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(params);
  }

  async findOne(id: string, output?: string): Promise<User> {
    const _output: string = output ? output : this.output;
    const params = `query {
      result: findUserById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.send(params);
  }

  async login(email: string, password: string): Promise<any> {
    const params = `query {
        result: login(input: ${toGraphql({ email, password })}) ${this.output}
      }`;
    return this.gqlClient.send(params);
  }

  async findBy(condition: any, output?: string): Promise<User[]> {
    const _output: string = output ? output : this.output;
    const params = `query {
      result: findUserBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    return this.gqlClient.send(params);
  }

  async findByEmail(email: string) {
    const [user] = await this.findBy(
      [
        {
          record_key: 'email',
          record_value: email,
        },
      ],
      `{id email status}`,
    );
    return user;
  }

  async findByInvitationToken(token: string): Promise<any> {
    const [user] = await this.findBy(
      [
        {
          record_key: 'invitation_token',
          record_value: token,
        },
      ],
      `{id status invitation_token invitation_token_expiry}`,
    );
    return user;
  }

  async findByPasswordResetToken(token: string) {
    const [user] = await this.findBy(
      [
        {
          record_key: 'password_reset_token',
          record_value: token,
        },
      ],
      `{id password_reset_token password_reset_token_expiry status}`,
    );
    return user;
  }

  async update(id: string, input: any): Promise<User> {
    const user: User = await this.findOne(id, `{id}`);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const params = `mutation {
      result: updateUser(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    console.log(params);
    return this.gqlClient.send(params);
  }

  async delete(id: string): Promise<boolean> {
    const user: User = await this.findOne(id, `{id}`);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const params = `mutation {
      result: deleteUser(id: "${id}") 
    }`;
    return this.gqlClient.send(params);
  }
}
