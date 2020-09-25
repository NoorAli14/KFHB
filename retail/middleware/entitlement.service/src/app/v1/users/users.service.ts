import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import { UserRepository } from "@core/repository/";
import { Encrypter } from "@common/encrypter";
import {MESSAGES, NUMBERS, STATUS, TABLE, TEMP_ROLE, WEEK_DAYS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";
import {addMinutes, generateRandomString} from "@common/utilities";
import {ConfigurationService} from "@common/configuration/configuration.service";
import {HolidaysService} from '@app/v1/holiday/holidays.service';
import {LeavesService} from '@app/v1/leave/leaves.service';
import {validateDate, validateGender} from '@common/validator';
import {WorkingDaysService} from '@app/v1/working-days/working-days.service';
import { ICurrentUser, ITenant } from "@common/interfaces";
import { User } from "./user.model";
import { PasswordMismatchException } from "./exceptions/password-mismatch.exception";
import { UpdatePasswordInput } from "./user.dto";

@Injectable()
export class UserService {
  constructor(private userDB: UserRepository,
              private encrypter: Encrypter,
              private configService: ConfigurationService,
              private holidaysService: HolidaysService,
              private leavesService: LeavesService,
              private workingDaysService: WorkingDaysService,
              ) {}

  async list(keys: string[], paginationParams: Record<string, any>): Promise<any> {
    return this.userDB.listWithPagination(paginationParams, keys,{deleted_on : null});
  }

  async findById(currentUser: ICurrentUser ,id: string, output?: string[]): Promise<User> {
    return this.userDB.findOne({ id: id, deleted_on : null, tenant_id: currentUser.tenant_id }, output);
  }

  async resetInvitationToken(currentUser: ICurrentUser, id: string, keys?: string[]): Promise<any> {
    const input: any = {
      invitation_token : generateRandomString(NUMBERS.TOKEN_LENGTH),
      invitation_token_expiry : addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY)
    };
    return this.update(currentUser, id, input, keys);
  }

  async findByProperty(currentUser: ICurrentUser, checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['tenant_id'] = currentUser.tenant_id;
    conditions['deleted_on'] = null;
    return this.userDB.findBy(conditions, keys);
  }

  async update(
    currentUser: ICurrentUser,
    id: string,
    userObj: Record<string, any>,
    keys?: string[],
  ): Promise<User> {
    if(userObj.password) {
      userObj.password_digest = this.encrypter.encryptPassword(userObj.password);
      delete userObj.password;
    }
    userObj = {
      ...userObj,
      updated_by: currentUser.id,
    }
    const whereCondition = {
      id: id,
      deleted_on : null,
      tenant_id: currentUser.tenant_id,
    }
    const [result] = await this.userDB.update(whereCondition, userObj, keys);
    if(!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async create(currentUser: ICurrentUser, newUser: Record<string, any>, keys?: string[]): Promise<User> {
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
    newUser = {
      ...newUser,
      invitation_token: generateRandomString(NUMBERS.TOKEN_LENGTH),
      invitation_token_expiry: addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY),
      tenant_id: currentUser.tenant_id,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    };
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

  async delete(currentUser: ICurrentUser, id: string): Promise<boolean> {
    const result = await this.userDB.markAsDelete(currentUser.tenant_id, currentUser.id, id);
    return !!result;
  }

  async updateUserPassword(
    currentUser: ICurrentUser,
    user: User,
    input: UpdatePasswordInput,
    output: string[]
  ): Promise<User> {
    if (!this.encrypter.comparePassword(input.current_password, user.password_digest)){
      throw new PasswordMismatchException(user.id);
    }
    const userObj = {
      password_digest : this.encrypter.encryptPassword(input.new_password)
    };
    return this.update(currentUser, user.id, userObj, output);
  }

  async check_availability(currentUser: ICurrentUser, input: Record<string, any>): Promise<any> {
    const date = validateDate(input.call_time);
    input.gender && validateGender(input.gender);
    input.call_time = date.substring(0,10);
    // if(!await this.isHoliday(obj) && await this.isWorkingDay(date, currentUser.tenant_id)) {
    //   return this.availableAgents(obj)
    // } else{
    //   return []
    // }
    return []
  }

  // async isHoliday(obj: Record<string, any>): Promise<boolean> {
  //   const checks: KeyValInput[] = [
  //     {
  //       record_key: 'holiday_date',
  //       record_value: obj.call_time
  //     },
  //     {
  //       record_key: 'tenant_id',
  //       record_value: obj.tenant_id
  //     }
  //   ];
  //   const holidays = await this.holidaysService.findByProperty(checks, ['id', 'created_on']);
  //   return !!holidays.length;
  // }

  // async isWorkingDay(date: string, tenant_id: string): Promise<boolean> {
  //   const weekDay = Object.keys(WEEK_DAYS)[new Date(date).getDay()];
  //   const checks: KeyValInput[] = [
  //     {
  //       record_key: 'week_day',
  //       record_value: weekDay
  //     },
  //     {
  //       record_key: 'tenant_id',
  //       record_value: tenant_id
  //     }
  //   ];
  //   const days = await this.workingDaysService.findByProperty(checks, ['start_time', 'end_time', 'full_day']);
  //   if(days && days.length > 0) {
  //     const day = days[0];
  //     try {
  //       if (day.full_day) return true;
  //       if (Date.parse(date) > Date.parse(new Date(day.start_time).toISOString())
  //         && Date.parse(date) < Date.parse(new Date(day.end_time).toISOString()))
  //         return true;
  //     } catch (e) {
  //       return false;
  //     }
  //   }
  //   return false;
  // }

  // async availableAgents(obj: Record<string, any>): Promise<any> {
  //   const checks: KeyValInput[] = [
  //     {
  //       record_key: 'leave_date',
  //       record_value: obj.call_time
  //     },
  //     {
  //       record_key: 'tenant_id',
  //       record_value: obj.tenant_id
  //     }
  //   ];
  //   const leaves = await this.leavesService.findByProperty(checks, ['id', 'user_id', 'created_on']);
  //   const userIds: [] = leaves.map(leave => leave.user_id);
  //   const conditions = {};
  //   conditions[`${TABLE.USER}.deleted_on`] = null;
  //   conditions[`${TABLE.USER}.tenant_id`] = obj.tenant_id;
  //   conditions[`${TABLE.ROLE}.name`] = TEMP_ROLE.AGENT;
  //   if (obj.gender) {
  //     conditions[`${TABLE.USER}.gender`] = obj.gender;
  //   }
  //   return this.userDB.listExcludedUsers(userIds, conditions)
  // }
}
