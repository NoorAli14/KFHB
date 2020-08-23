import { Injectable, Logger } from '@nestjs/common';
import { generateRandomString } from '@rubix/common/utilities';
import { SessionRepository } from '@rubix/core/repository/';
import { Session } from './session.model';
import Identity from 'identity-api';
@Injectable()
export class SessionsService {
  private identity: Identity;
  constructor(private sessionDB: SessionRepository) {
    this.identity = new Identity({
      apiBase: 'https://aionuatserver.uaenorth.cloudapp.azure.com:8443',
      apiVersion: 'v1',
      maxNetworkRetries: 1,
      auth: {
        username: 'aionadmin',
        password: 'A!iondigital123',
      },
      config: {
        tenant: 'kfhk-test',
      },
    });
  }

  // async list(columns: string[]): Promise<User[]> {
  //   return this.userDB.findAll(columns);
  // }

  // async findById(id: string, columns?: string[]): Promise<User> {
  //   return this.userDB.findOne({ id }, columns);
  // }

  // async update(
  //   id: string,
  //   userOBJ: { [key: string]: any },
  //   columns?: string[],
  // ): Promise<User> {
  //   const [user] = await this.userDB.update({ id }, userOBJ, columns);
  //   return user;
  // }

  async create(
    input: { [key: string]: any },
    columns?: string[],
  ): Promise<Session> {
    try {
      const _user = await this.identity.users.create({
        userId: input.reference_id,
      });
      input.target_user_id = _user.id;
      const [session] = await this.sessionDB.create(input, columns);
      return session;
    } catch (error) {
      // Logger.log(error);
      throw error;
    }
  }

  // async delete(id: string): Promise<boolean> {
  //   return await this.userDB.delete({ id });
  // }
}
