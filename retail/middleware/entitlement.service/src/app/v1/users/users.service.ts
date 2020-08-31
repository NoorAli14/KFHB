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

  async list(keys: string[], paginationParams: Record<string, any>): Promise<any> {
    return this.userDB.listWithPagination(paginationParams, keys,{deleted_on : null});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.userDB.findOne({ id: id, deleted_on : null }, keys);
  }

  async resetInvitationToken(id: string, keys?: string[]): Promise<any> {
    const input: any = {
      invitation_token : generateRandomString(NUMBERS.TOKEN_LENGTH),
      invitation_token_expiry : addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY)
    };
    return this.update(id, input, keys);
  }

  async findByProperty(checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['deleted_on'] = null;
    return this.userDB.findBy(conditions, keys);
  }

  async update(
    id: string,
    userObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    if(userObj.status && !STATUS[userObj.status]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    if(userObj.password) {
      userObj.password_digest = this.encrypter.encryptPassword(userObj.password);
      delete userObj.password;
    }
    const [result] = await this.userDB.update({ id: id, deleted_on : null }, userObj, keys);
    if(!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async create(newUser: Record<string, any>, keys?: string[]): Promise<any> {
    if(newUser.password) {
      newUser.password_digest = this.encrypter.encryptPassword(newUser.password);
      delete newUser.password;
    }
    if(!newUser.status){
      newUser.status = STATUS.PENDING;
    } else if(!STATUS[newUser.status]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    newUser.invitation_token = generateRandomString(NUMBERS.TOKEN_LENGTH);
    newUser.invitation_token_expiry = addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY);
    const result = await this.userDB.create(newUser, keys);
    if(result?.length > 0) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string, input: Record<any, any>): Promise<any> {
    const result = await this.update(id, input, ['id']);
    return !!result;
  }
}
