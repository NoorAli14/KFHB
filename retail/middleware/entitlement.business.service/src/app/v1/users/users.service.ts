import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { User } from './user.entity';
import { GqlClientService, IHEADER, toGraphql } from '@common/index';
import { ChangePasswordDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
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

  async list(header: IHEADER): Promise<User[]> {
    const query: string = `query {
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
    return this.gqlClient.setHeaders(header).send(query);
  }

  async create(header: IHEADER, input: any): Promise<User> {
    const user: User = await this.findByEmail(header, input.email);
    if (user) {
      throw new UnprocessableEntityException(
        `User Already Exist with email ${input.email}`,
      );
    }
    const mutation: string = `mutation {
      result: addUser(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async findOne(header: IHEADER, id: string, output?: string): Promise<User> {
    const _output: string = output ? output : this.output;
    const query: string = `query {
      result: findUserById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async login(email: string, password: string): Promise<any> {
    const query: string = `query {
        result: login(input: ${toGraphql({ email, password })}) ${this.output}
      }`;
    return this.gqlClient.send(query);
  }

  async findBy(
    header: IHEADER,
    condition: any,
    output?: string,
  ): Promise<User[]> {
    const _output: string = output ? output : this.output;
    const params = `query {
      result: findUserBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(params);
  }

  async findByEmail(header: IHEADER, email: string) {
    const [user] = await this.findBy(
      header,
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

  async findByInvitationToken(header: IHEADER, token: string): Promise<any> {
    const [user] = await this.findBy(
      header,
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

  async findByPasswordResetToken(header: IHEADER, token: string) {
    const [user] = await this.findBy(
      header,
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
    header: IHEADER,
    id: string,
    input: UpdateUserDto,
  ): Promise<User> {
    this.logger.log(`Start updating user with ID [${id}]`);
    const user: User = await this.findOne(header, id, `{id}`);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const mutation: string = `mutation {
      result: updateUser(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async delete(header: IHEADER, id: string): Promise<boolean> {
    this.logger.log(`Start deleting user with ID [${id}]`);

    const user: User = await this.findOne(header, id, `{id}`);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const mutation: string = `mutation {
      result: deleteUser(id: "${id}") 
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async changePassword(header: IHEADER, input: ChangePasswordDto) {
    this.logger.log(`Init Change Password request`);
    const mutation: string = `mutation{
      result: updatePassword(input: ${toGraphql(input)}){
          id
          email
      }
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
