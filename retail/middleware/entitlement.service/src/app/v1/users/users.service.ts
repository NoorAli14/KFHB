import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserRepository } from "@core/repository/";
import { Encrypter } from "@common/encrypter";
import { MESSAGES, NUMBERS, STATUS, TABLE } from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";
import { addMinutes, dateFormat, generateRandomString } from "@common/utilities";
import { ConfigurationService } from "@common/configuration/configuration.service";
import { HolidaysService } from '@app/v1/holiday/holidays.service';
import { LeavesService } from '@app/v1/leave/leaves.service';
import { WorkingDaysService } from '@app/v1/working-days/working-days.service';
import { ICurrentUser } from '@common/interfaces';
import { CheckAvailabilityInput } from '@app/v1/users/user.dto';
import { User } from '@app/v1/users/user.model';

@Injectable()
export class UserService {
  constructor(private userDB: UserRepository,
    private encrypter: Encrypter,
    private configService: ConfigurationService,
    private holidaysService: HolidaysService,
    private leavesService: LeavesService,
    private workingDaysService: WorkingDaysService,
  ) { }

  async list(keys: string[], paginationParams: Record<string, any>): Promise<any> {
    return this.userDB.listWithPagination(paginationParams, keys, { deleted_on: null });
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.userDB.findOne({ id: id, deleted_on: null }, keys);
  }

  async resetInvitationToken(id: string, keys?: string[]): Promise<any> {
    const input: any = {
      invitation_token: generateRandomString(NUMBERS.TOKEN_LENGTH),
      invitation_token_expiry: addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY)
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
    if (userObj.password) {
      userObj.password_digest = this.encrypter.encryptPassword(userObj.password);
      delete userObj.password;
    }
    if (userObj.status && !STATUS[userObj.status]) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    const [result] = await this.userDB.update({ id: id, deleted_on: null }, userObj, keys);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async create(newUser: Record<string, any>, keys?: string[]): Promise<any> {
    if (newUser.password) {
      newUser.password_digest = this.encrypter.encryptPassword(newUser.password);
      delete newUser.password;
    }
    if (!newUser.status) {
      newUser.status = STATUS.PENDING;
    } else if (!STATUS[newUser.status]) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    newUser.invitation_token = generateRandomString(NUMBERS.TOKEN_LENGTH);
    newUser.invitation_token_expiry = addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY);
    const result = await this.userDB.create(newUser, keys);
    if (result?.length > 0) {
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

  async updateUserPassword(user: Record<string, any>,
    input: Record<string, any>,
    keys: string[]): Promise<any> {
    if (!this.encrypter.comparePassword(input.current_password, user.password_digest)) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.PASSWORD_MISMATCH,
      }, HttpStatus.BAD_REQUEST);
    }
    const userObj = {
      password_digest: this.encrypter.encryptPassword(input.new_password)
    };
    return this.update(user.id, userObj, keys);
  }

  async availableAgents(current_user: ICurrentUser, input: CheckAvailabilityInput): Promise<User[]> {
    const date_string = input.call_time;
    input.call_time = dateFormat(input.call_time, true);
    if (!await this.holidaysService.isHoliday(current_user.tenant_id, input.call_time) && await this.workingDaysService.isWorkingDay(current_user.tenant_id, date_string)) {
      const leaves = await this.leavesService.findByDate(current_user, input.call_time, ['id', 'user_id']);
      const userIds: string[] = leaves.map(leave => leave.user_id);
      const conditions = {};
      conditions[`${TABLE.USER}.tenant_id`] = current_user.tenant_id;
      conditions[`${TABLE.PERMISSION}.record_type`] = "attend";
      if (input.gender) {
        conditions[`${TABLE.USER}.gender`] = input.gender;
      }
      return this.userDB.listExcludedUsers(userIds, conditions);
    } else {
      return []
    }
  }
}
