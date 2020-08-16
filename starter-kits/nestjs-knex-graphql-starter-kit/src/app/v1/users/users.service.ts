import { Injectable } from '@nestjs/common';
import { UserRepository } from '@rubix/core/repository/';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private userDB: UserRepository) {}

  async list(columns: string[]): Promise<User[]> {
    return this.userDB.findAll(columns);
  }

  async findById(id: string, columns?: string[]): Promise<User> {
    return this.userDB.findOne({ id }, columns);
  }

  async update(
    id: string,
    userOBJ: {[key: string]: any},
    columns?: string[],
  ): Promise<User> {
    const [user] = await this.userDB.update({ id }, userOBJ, columns);
    return user;
  }

  async create(userOBJ: {[key: string]: any}, columns?: string[]): Promise<User> {
    const [user] = await this.userDB.create(userOBJ, columns);
    return user;
  }

  async delete(id: string): Promise<boolean> {
    return await this.userDB.delete({ id });
  }
  
}
