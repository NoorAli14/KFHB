import { Injectable } from '@nestjs/common';

import { UserRepository } from '@core/repository/';
import { Encrypter } from '@common/encrypter';
import {
  NUMBERS,
  STATUS,
  SYSTEM_AUDIT_CODES,
  SYSTEM_AUDIT_LOG_STRINGS,
  TABLE,
} from '@common/constants';
import { KeyValInput } from '@common/inputs/key-val.input';
import {
  addMinutes,
  dateFormat,
  generateRandomString,
} from '@common/utilities';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { HolidaysService } from '@app/v1/holiday/holidays.service';
import { LeavesService } from '@app/v1/leave/leaves.service';
import { WorkingDaysService } from '@app/v1/working-days/working-days.service';
import { ICurrentUser } from '@common/interfaces';
import { CheckAvailabilityInput } from './user.dto';
import { User, UsersWithPagination } from './user.model';
import { PasswordMismatchException } from './exceptions/password-mismatch.exception';
import { UpdatePasswordInput } from './user.dto';
import { PaginationParams, SortingParam } from '@common/dtos';
import { UsersFilterParams } from './dtos';
import { CreatedOnStartShouldBeLessThanEndException } from '@common/exceptions';
import { SystemAuditLogService } from '@app/v1/system-audit-log/system-audit-log.service';

@Injectable()
export class UserService {
  constructor(
    private userDB: UserRepository,
    private encrypter: Encrypter,
    private configService: ConfigurationService,
    private holidaysService: HolidaysService,
    private leavesService: LeavesService,
    private workingDaysService: WorkingDaysService,
    private systemAuditLogService: SystemAuditLogService,
  ) {}

  async list(
    current_user: ICurrentUser,
    paginationParams: PaginationParams,
    filteringParams: UsersFilterParams,
    sortingParams: SortingParam,
    output: string[],
  ): Promise<UsersWithPagination> {
    if (
      filteringParams?.created_on &&
      new Date(filteringParams?.created_on.start).getTime() >
        new Date(filteringParams?.created_on.end).getTime()
    ) {
      throw new CreatedOnStartShouldBeLessThanEndException(
        filteringParams?.created_on.start,
        filteringParams?.created_on.end,
      );
    }
    const condition = {
      deleted_on: null,
      tenant_id: current_user.tenant_id
    };
    if (current_user.entity_id) condition['entity_id'] = current_user.entity_id;
    return this.userDB.list(
      paginationParams,
      filteringParams,
      sortingParams,
      condition,
      output,
    );
  }

  async findById(
    currentUser: ICurrentUser,
    id: string,
    output?: string[],
  ): Promise<User> {
    const condition = {
      id,
      deleted_on: null,
      tenant_id: currentUser.tenant_id
    };
    if (currentUser.entity_id) condition['entity_id'] = currentUser.entity_id;
    return this.userDB.findOne(condition, output);
  }

  async resetInvitationToken(
    currentUser: ICurrentUser,
    user: User,
    output?: string[],
  ): Promise<User> {
    const input: any = {
      invitation_token: generateRandomString(NUMBERS.TOKEN_LENGTH),
      invitation_token_expiry: addMinutes(
        this.configService.APP.INVITATION_TOKEN_EXPIRY,
      ),
    };
    return this.update(
      currentUser,
      user,
      input,
      output,
      SYSTEM_AUDIT_LOG_STRINGS.RESET_INVITATION_TOKEN_SUCCESS + ` of user ${user.email}`,
    );
  }

  async findByProperty(
    currentUser: ICurrentUser,
    checks: KeyValInput[],
    output?: string[],
  ): Promise<User[]> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['tenant_id'] = currentUser.tenant_id;
    conditions['deleted_on'] = null;
    if (currentUser.entity_id) conditions['entity_id'] = currentUser.entity_id;
    return this.userDB.findBy(conditions, output);
  }

  async update(
    currentUser: ICurrentUser,
    user: User,
    userObj: Record<string, any>,
    output: string[],
    eventString?: string,
    eventHeading?: string,
  ): Promise<User> {
    if (userObj.password) {
      userObj.password_digest = this.encrypter.encryptPassword(
        userObj.password,
      );
      delete userObj.password;
    }
    userObj = {
      ...userObj,
      updated_by: currentUser.id,
    };
    const whereCondition = {
      id: user.id,
      deleted_on: null,
      tenant_id: currentUser.tenant_id
    };
    if (currentUser.entity_id) whereCondition['entity_id'] = currentUser.entity_id;
    const [result] = await this.userDB.update(whereCondition, userObj, output);
    await this.systemAuditLogService.create(currentUser.tenant_id, {
      audit_code: eventHeading || SYSTEM_AUDIT_CODES.UPDATE_USER_SUCCESS,
      audit_text: eventString || ( SYSTEM_AUDIT_LOG_STRINGS.UPDATE_USER_SUCCESS + ` of email ${user.email} `),
      user_id: currentUser.id,
    });
    return result;
  }

  async create(
    currentUser: ICurrentUser,
    newUser: Record<string, any>,
    output?: string[],
  ): Promise<User> {
    if (newUser.password) {
      newUser.password_digest = this.encrypter.encryptPassword(
        newUser.password,
      );
      delete newUser.password;
    }
    if (!newUser.status) {
      newUser.status = STATUS.PENDING;
    }
    newUser = {
      ...newUser,
      invitation_token: generateRandomString(NUMBERS.TOKEN_LENGTH),
      invitation_token_expiry: addMinutes(
        this.configService.APP.INVITATION_TOKEN_EXPIRY,
      ),
      tenant_id: currentUser.tenant_id,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    };
    if (currentUser.entity_id) newUser['entity_id'] = currentUser.entity_id;
    const [result] = await this.userDB.create(newUser, output);
    await this.systemAuditLogService.create(currentUser.tenant_id, {
      audit_code: SYSTEM_AUDIT_CODES.CREATE_USER_SUCCESS,
      audit_text: SYSTEM_AUDIT_LOG_STRINGS.CREATE_USER_SUCCESS + ` of email ${newUser.email}`,
      user_id: currentUser.id,
    });
    return result;
  }

  async delete(currentUser: ICurrentUser, user: User): Promise<boolean> {
    const result = await this.userDB.markAsDelete(
      currentUser.tenant_id,
      currentUser.id,
      user.id,
      currentUser.entity_id,
    );
    await this.systemAuditLogService.create(currentUser.tenant_id, {
      audit_code: SYSTEM_AUDIT_CODES.DELETE_USER_SUCCESS,
      audit_text: SYSTEM_AUDIT_LOG_STRINGS.DELETE_USER_SUCCESS + ` of email ${user.email}`,
      user_id: currentUser.id,
    });
    return !!result;
  }

  async updateUserPassword(
    currentUser: ICurrentUser,
    user: User,
    input: UpdatePasswordInput,
    output: string[],
  ): Promise<User> {
    if (
      !this.encrypter.comparePassword(
        input.current_password,
        user.password_digest,
      )
    ) {
      await this.systemAuditLogService.create(currentUser.tenant_id, {
        audit_code: SYSTEM_AUDIT_CODES.UPDATE_PASSWORD_FAILED,
        audit_text: SYSTEM_AUDIT_LOG_STRINGS.UPDATE_PASSWORD_FAILED + ` of user ${user.email}`,
        user_id: currentUser.id,
      });
      throw new PasswordMismatchException(user.id);
    }
    const userObj = {
      password_digest: this.encrypter.encryptPassword(input.new_password),
    };
    return this.update(
      currentUser,
      user,
      userObj,
      output,
      SYSTEM_AUDIT_LOG_STRINGS.UPDATE_PASSWORD_SUCCESS + ` of user ${user.email}`,
      SYSTEM_AUDIT_CODES.UPDATE_PASSWORD_SUCCESS
    );
  }

  async findAvailableAgents(
    current_user: ICurrentUser,
    input: CheckAvailabilityInput,
  ): Promise<User[]> {
    const date_string = input.call_time;
    input.call_time = dateFormat(input.call_time, true);
    if (
      !(await this.holidaysService.isHoliday(
        current_user.tenant_id,
        input.call_time,
      )) &&
      (await this.workingDaysService.isWorkingDay(
        current_user.tenant_id,
        date_string,
      ))
    ) {
      const leaves = await this.leavesService.findByDate(
        current_user,
        input.call_time,
        ['id', 'user_id'],
      );
      const userIds: string[] = leaves.map(leave => leave.user_id);
      const conditions = {};
      conditions[`${TABLE.USER}.tenant_id`] = current_user.tenant_id;
      conditions[`${TABLE.PERMISSION}.record_type`] = 'attend';
      if (input.gender) {
        conditions[`${TABLE.USER}.gender`] = input.gender;
      }
      if (current_user.entity_id) conditions[`${TABLE.USER}.entity_id`] = current_user.entity_id;
      return this.userDB.listExcludedUsers(userIds, conditions);
    } else {
      return [];
    }
  }
}
