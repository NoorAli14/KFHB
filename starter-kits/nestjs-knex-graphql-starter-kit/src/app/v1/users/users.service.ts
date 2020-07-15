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

  async update(id: string, userObj: Object) {
    const user = await this.userDB.findBy({ id: id });
    return user;
  }
  async create(newUser: Object): Promise<any> {
    const [user] = await this.userDB.create(newUser);
    return user;
  }
}
