import { Injectable } from '@nestjs/common';
import { Role } from './forgot_password.entity';
import { RoleDto } from './forgot_password.dto';

@Injectable()
export class ForgotPasswordService {
  private readonly roles: Role[] = [
    { id: '1', name: 'Manger', status: 'ACTIVE' },
    { id: '2', name: 'Admin', status: 'INACTIVE' },
  ];

  async list(): Promise<Role[]> {
    return this.roles;
  }

  async create(input: Role): Promise<Role> {
    this.roles.push(input);
    return input;
  }

  async findOne(id: string): Promise<Role> {
    return this.roles.find(role => role.id === id);
  }

  async update(id: string, input: Role): Promise<Role> {
    this.roles[id] = input;
    return input;
  }

  async delete(id: string): Promise<boolean> {
    delete this.roles[id];
    return true;
  }
}
