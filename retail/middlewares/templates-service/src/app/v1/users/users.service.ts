import { Injectable } from '@nestjs/common';
import { UserRepository } from '@core/repository/';

@Injectable()
export class UserService {
  constructor(private userDB: UserRepository) {}

 async list(keys: string[]): Promise<any> {
    return this.userDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.userDB.findOne({ id: id }, keys);
  }

  async update(
    id: string,
    userObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [user] = await this.userDB.update({ id: id }, userObj, keys);
    return user;
  }
  async create(newUser: Record<string, any>, keys?: string[]): Promise<any> {
    const [user] = await this.userDB.create(newUser, keys);
    return user;
  }
  async delete(id: string): Promise<any> {
    return await this.userDB.delete({ id: id });
  }
}
