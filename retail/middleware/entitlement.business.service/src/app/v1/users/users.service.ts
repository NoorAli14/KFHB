import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SuccessDto } from '@common/dtos/';
import { User } from './user.entity';
import { toGraphql } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { throwError } from 'rxjs';
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
      users: usersList {
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
    const result = await this.gqlClient.send(params);
    return result?.users;
  }

  async create(input: any): Promise<User> {
    const user: User = await this.findByEmail(input.email);
    if (user) {
      throw new UnprocessableEntityException(
        `User Already Exist with email ${input.email}`,
      );
    }
    const params = `mutation {
      user: addUser(input: ${toGraphql(input)}) ${this.output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.user;
  }

  async findOne(id: string, output?: string): Promise<User> {
    const _output: string = output ? output : this.output;
    const params = `query {
      user: findUserById(id: "${id}") ${_output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.user;
  }

  async findOneByToken(token: string): Promise<User> {
    // return this.users.find(role => role.id === token);
    return new User();
  }

  async login(email: string, password: string): Promise<any> {
    const params = `query {
        user: login(input: ${toGraphql({ email, password })}) ${this.output}
      }`;
    const result = await this.gqlClient.send(params);
    return result?.user;
  }

  async findBy(condition: any, output?: string): Promise<User[]> {
    const _output: string = output ? output : this.output;
    const params = `query {
      user: findUserBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.user;
  }

  async findByEmail(email: string) {
    const [user] = await this.findBy(
      [
        {
          record_key: 'email',
          record_value: email,
        },
      ],
      `{id email}`,
    );
    return user;
  }

  async findByPasswordResetToken(token: string) {
    const [user] = await this.findBy(
      [
        {
          record_key: 'token',
          record_value: token,
        },
      ],
      `{id token token_expiry}`,
    );
    return user;
  }

  async updateByToken(token: string, user: any): Promise<User> {
    // this.users[token] = user;
    return new User();

    // return user;
  }
  async update(id: string, input: any): Promise<User> {
    const user: User = await this.findOne(id, `{id}`);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const params = `mutation {
      user: updateUser(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.user;
  }

  async delete(id: string): Promise<boolean> {
    const user: User = await this.findOne(id, `{id}`);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const params = `mutation {
      user: deleteUser(id: "${id}") 
    }`;
    const result = await this.gqlClient.send(params);
    return result?.user;
  }

  async resendInvitationLink(user_id: string) {
    return true;
  }
}
