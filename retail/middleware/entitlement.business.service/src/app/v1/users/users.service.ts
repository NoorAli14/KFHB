import {
  Injectable,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { User } from './user.entity';
import { GqlClientService, toGraphql } from '@common/index';
import { ChangePasswordDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  private readonly output: string = ` {
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

  constructor(private readonly gqlClient: GqlClientService) { }

  async list(): Promise<User[]> {
    const query = `query {
      result: usersList {
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
        status
        created_on
        created_by
        updated_on
        updated_by
      }
    }`;
    return this.gqlClient.send(query);
  }

  async create(input: any): Promise<User> {
    const user: User = await this.findByEmail(input.email);
    if (user) {
      throw new UnprocessableEntityException(
        `User Already Exist with email ${input.email}`,
      );
    }
    const mutation = `mutation {
      result: addUser(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async findOne(id: string, output?: string): Promise<User> {
    const _output: string = output ? output : this.output;
    const query = `query {
      result: findUserById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.send(query);
  }

  async login(email: string, password: string): Promise<any> {
    const query = `query {
        result: login(input: ${toGraphql({ email, password })}) ${this.output}
      }`;
    return this.gqlClient.send(query);
  }

  async findBy(
    condition: [Record<string, unknown>],
    output?: string,
  ): Promise<User[]> {
    const _output: string = output ? output : this.output;
    const params = `query {
      result: findUserBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    return this.gqlClient.send(params);
  }

  async findByEmail(email: string): Promise<User> {
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

  async findByPasswordResetToken(token: string): Promise<any> {
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

  async update(
    id: string,
    input: UpdateUserDto,
  ): Promise<User> {
    this.logger.log(`Start updating user with ID [${id}]`);
    // const user: User = await this.findOne(id, `{id}`);
    // if (!user) {
    //   throw new NotFoundException('User Not Found');
    // }
    const mutation = `mutation {
      result: updateUser(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Start deleting user with ID [${id}]`);

    // const user: User = await this.findOne(header, id, `{id}`);
    // if (!user) {
    //   throw new NotFoundException('User Not Found');
    // }
    const mutation = `mutation {
      result: deleteUser(id: "${id}") 
    }`;
    return this.gqlClient.send(mutation);
  }

  async changePassword(input: ChangePasswordDto): Promise<User> {
    this.logger.log(`Init Change Password request`);
    const mutation = `mutation{
      result: updatePassword(input: ${toGraphql(input)}){
          id
          email
      }
    }`;
    return this.gqlClient.send(mutation);
  }
}
