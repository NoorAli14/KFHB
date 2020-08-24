import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import { UserRepository } from "@core/repository/";
import { Encrypter } from "@common/encrypter";
import {MESSAGES, NUMBERS, STATUS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";
import {addMinutes, generateRandomString} from "@common/utilities";
import {ConfigurationService} from "@common/configuration/configuration.service";

@Injectable()
export class UserService {
  constructor(private userDB: UserRepository,
              private encrypter: Encrypter,
              private configService: ConfigurationService) {}

  async list(keys: string[]): Promise<any> {
    return this.userDB.list(keys,{"status" : STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.userDB.findOne({ id: id }, keys);
    if(!result){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: MESSAGES.NOT_FOUND,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async resetInvitationToken(id: string, keys?: string[]): Promise<any> {
    const result = await this.findById(id, ['id']);
    if (result && result.id) {
      const user = {
        invitation_token : generateRandomString(NUMBERS.TOKEN_LENGTH),
        invitation_token_expiry : addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY)
      };
      return this.update(id, user, keys);
    }
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.INVALID_ID,
    }, HttpStatus.NOT_FOUND);
  }

  async findByProperty(checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    const result = await this.userDB.findBy(conditions, keys);
    if(!result){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: MESSAGES.NOT_FOUND,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async update(
    id: string,
    userObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const result = await this.userDB.update({ id: id }, userObj, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async create(newUser: Record<string, any>, keys?: string[]): Promise<any> {
    if(newUser.password) {
      newUser.password_digest = this.encrypter.encryptPassword(newUser.password);
      delete newUser.password;
    }
    if(!newUser.status){
      newUser.status = STATUS.PENDING;
    }
    newUser.invitation_token = generateRandomString(NUMBERS.TOKEN_LENGTH);
    newUser.invitation_token_expiry = addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY);
    const result = await this.userDB.create(newUser, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    const result = await this.update(id, {status: STATUS.INACTIVE});
    return !!result;
  }
}
