import { Injectable } from '@nestjs/common';
import { UserRepository } from '@core/repository/';
import {UserPropInput} from "@app/v1/users/user.dto";
import {Encrypter} from "@common/encrypter";

@Injectable()
export class UserService {
  constructor(private userDB: UserRepository,
              private encrypter: Encrypter) {}

  async list(keys: string[]): Promise<any> {
    return this.userDB.list(keys,{"status":"ACTIVE"});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.userDB.findOne({ id: id }, keys);
  }

  async findByProperty(checks: UserPropInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    return this.userDB.findBy(conditions, keys);
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
    newUser.password_digest = this.encrypter.encryptPassword(newUser.password_digest);
    const [user] = await this.userDB.create(newUser, keys);
    return user;
  }

  async delete(id: string): Promise<any> {
    return await this.userDB.delete({ id: id });
  }
}
