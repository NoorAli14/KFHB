import { Injectable } from '@nestjs/common';
import { SuccessDto } from '@common/dtos/';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private permissions: any = [
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a11',
      record_type: 'create',
      created_on: '2020-08-13T10:58:15.893Z',
      updated_on: '2020-08-13T10:58:15.893Z',
      deleted_on: '2020-08-13T10:58:15.893Z',
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a12',
      record_type: 'update',
      created_on: '2020-08-13T10:58:15.893Z',
      updated_on: '2020-08-13T10:58:15.893Z',
      deleted_on: '2020-08-13T10:58:15.893Z',
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a13',
      record_type: 'delete',
      created_on: '2020-08-13T10:58:15.893Z',
      updated_on: '2020-08-13T10:58:15.893Z',
      deleted_on: '2020-08-13T10:58:15.893Z',
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a14',
      record_type: 'list',
      created_on: '2020-08-13T10:58:15.893Z',
      updated_on: '2020-08-13T10:58:15.893Z',
      deleted_on: '2020-08-13T10:58:15.893Z',
    },
  ];

  private modules: any = [
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a11',
      name: 'User Management',
      status: 'ACTIVE',
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      created_on: new Date(),
      updated_on: new Date(),
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a12',
      name: 'Configuration',
      status: 'ACTIVE',
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      created_on: new Date(),
      updated_on: new Date(),
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a13',
      name: 'Calender',
      status: 'ACTIVE',
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      created_on: new Date(),
      updated_on: new Date(),
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a14',
      name: 'Customization',
      status: 'ACTIVE',
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      created_on: new Date(),
      updated_on: new Date(),
    },
  ];

  private roles: any = [
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a11',
      name: 'Manger',
      status: 'ACTIVE',
      modules: [],
      created_on: new Date(),
      updated_on: new Date(),
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a12',
      name: 'Admin',
      status: 'ACTIVE',
      modules: [],
      created_on: new Date(),
      updated_on: new Date(),
    },
  ];
  private users: User[] = [
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a11',
      first_name: 'Faizan',
      middle_name: null,
      last_name: 'Ahmad',
      username: 'faizanahmad',
      email: 'faizan@aiondigital.com',
      date_of_birth: '04-12-1993',
      gender: 'M',
      modules: [],
      contact_no: '03338184261',
      status: 'ACTIVE',
      created_on: new Date(),
      created_by: 'SYSTEM',
      updated_on: new Date(),
      updated_by: 'SYSTEM',
      deleted_by: null,
      deleted_on: null,
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a12',
      first_name: 'Rashid',
      middle_name: null,
      last_name: 'Aslam',
      username: 'rashidaslam',
      email: 'rashid@aiondigital.com',
      date_of_birth: '12-12-1993',
      gender: 'M',
      modules: [],
      contact_no: '03338184261',
      status: 'ACTIVE',
      created_on: new Date(),
      created_by: 'SYSTEM',
      updated_on: new Date(),
      updated_by: 'SYSTEM',
      deleted_by: null,
      deleted_on: null,
    },
    {
      id: '3dfdecc1-a616-4817-a841-61d824d82a12',
      first_name: 'Muhammad Al',
      middle_name: null,
      last_name: 'Shah',
      username: 'mashah',
      email: 'mashah@aiondigital.com',
      date_of_birth: '12-12-1983',
      gender: 'M',
      modules: [],
      contact_no: '03338184261',
      status: 'ACTIVE',
      created_on: new Date(),
      created_by: 'SYSTEM',
      updated_on: new Date(),
      updated_by: 'SYSTEM',
      deleted_by: null,
      deleted_on: null,
    },
  ];

  constructor() {
    this.modules[1].sub_modules.push(this.modules[0]);
    this.modules[2].sub_modules.push(this.modules[1]);
    this.modules[3].sub_modules.push(this.modules[2]);
    this.modules[3].parent = this.modules[0];
    this.roles[0].modules.push(this.modules[1]);
    this.roles[0].modules.push(this.modules[2]);
    this.roles[1].modules.push(this.modules[3]);
    this.roles[1].modules.push(this.modules[4]);
    this.users[0].modules.push(this.modules[4]);
    this.users[1].modules.push(this.modules[4]);
    this.users[1].modules.push(this.modules[2]);
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async create(input: any): Promise<User> {
    this.users.push(input);
    return input;
  }

  async findOne(id: string): Promise<User> {
    return this.users.find(role => role.id === id);
  }

  async findOneByToken(token: string): Promise<User> {
    return this.users.find(role => role.id === token);
  }

  async updateByToken(token: string, user: any): Promise<User> {
    this.users[token] = user;
    return user;
  }
  async update(id: string, input: any): Promise<User> {
    this.users[id] = input;
    return input;
  }

  async delete(id: string): Promise<boolean> {
    delete this.users[id];
    return true;
  }

  async resendInvitationLink(user_id: string) {
    return true;
  }
}
