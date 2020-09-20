import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import { UserRepository } from "@core/repository/";
import { Encrypter } from "@common/encrypter";
import {MESSAGES, NUMBERS, STATUS, WEEK_DAYS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";
import {addMinutes, generateRandomString} from "@common/utilities";
import {ConfigurationService} from "@common/configuration/configuration.service";
import {HolidaysService} from '@app/v1/holiday/holidays.service';
import {LeavesService} from '@app/v1/leave/leaves.service';
import {validateDate, validateGender} from '@common/validator';
import {WorkingDaysService} from '@app/v1/working-days/working-days.service';

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

  async updateUserPassword(user: Record<string, any>,
                           input: Record<string, any>,
                           keys: string[]): Promise<any> {
    if (!this.encrypter.comparePassword(input.current_password, user.password_digest)){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.PASSWORD_MISMATCH,
      }, HttpStatus.BAD_REQUEST);
    }
    const userObj = {
      password_digest : this.encrypter.encryptPassword(input.new_password)
    };
    return this.update(user.id, userObj, keys);
  }

  async check_availability(obj?: Record<string, any>, keys?: string[]): Promise<any> {
    const date = validateDate(obj.call_time);
    obj.gender && validateGender(obj.gender);
    obj.call_time = date.substring(0,10);
    if(!await this.isHoliday(obj) && this.isWorkingDay(date)){
      return this.availableAgents(obj, keys)
    } else{
      return []
    }
  }

  async isHoliday(obj: Record<string, any>): Promise<boolean> {
    const checks: KeyValInput[] = [
      {
        record_key: 'holiday_date',
        record_value: obj.call_time
      }];
    const holidays = await this.holidaysService.findByProperty(checks, ['id', 'created_on']);
    return !!holidays.length;
  }

  async isWorkingDay(date: string): Promise<boolean> {
    const weekDay = Object.keys(WEEK_DAYS)[new Date(date).getDay()];
    const checks: KeyValInput[] = [
      {
        record_key: 'week_day',
        record_value: weekDay
      }];
    const days = await this.workingDaysService.findByProperty(checks, ['start_time', 'end_time', 'full_day']);
    if(days && days.length > 0) {
      const day = days[0];
      try {
        if (day.full_day) return true;
        if (Date.parse(date) > Date.parse(new Date(day.start_time).toISOString())
          && Date.parse(date) < Date.parse(new Date(day.end_time).toISOString()))
          return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  async availableAgents(obj: Record<string, any>, keys: string[]): Promise<any> {
    const checks: KeyValInput[] = [
      {
        record_key: 'leave_date',
        record_value: obj.call_time
      }];
    const leaves = await this.leavesService.findByProperty(checks, ['id', 'user_id', 'created_on']);
    const userIds: [] = leaves.map(leave => leave.user_id);
    const condition = {deleted_on : null};
    if (obj.gender) {
      condition['gender'] = obj.gender;
    }
    return this.userDB.listExcludedUsers(userIds, condition, keys)
  }
}
