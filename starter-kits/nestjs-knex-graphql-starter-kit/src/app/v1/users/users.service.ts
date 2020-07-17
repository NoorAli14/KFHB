import { Injectable } from '@nestjs/common';
import { UserRepository } from '@core/repository/';

@Injectable()
export class UserService {
  constructor(private userDB: UserRepository) {}

  async list(): Promise<any> {
    return this.userDB.list();
  }
  async findById(id: string): Promise<any> {
    return this.userDB.findOne({ id: id });
  }

  async update(id: string, userObj: Record<string, any>): Promise<any> {
    const [user] = await this.userDB.update({ id: id }, userObj);
    return user;
  }
  async create(newUser: Record<string, any>): Promise<any> {
    const [user] = await this.userDB.create(newUser);
    return user;
  }
  async delete(id: string): Promise<any> {
    return await this.userDB.delete({ id: id });
  }
}
