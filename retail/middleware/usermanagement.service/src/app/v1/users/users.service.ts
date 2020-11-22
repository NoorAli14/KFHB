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
      tenant_id: current_user.tenant_id,
      entity_id: current_user.entity_id || null
    };
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
      tenant_id: currentUser.tenant_id,
      entity_id: currentUser.entity_id || null
    };
    return this.userDB.findOne(condition, output);
  }

  async resetInvitationToken(
    currentUser: ICurrentUser,
    id: string,
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
      id,
      input,
      output,
      SYSTEM_AUDIT_LOG_STRINGS.INVITATION_TOKEN_RESET + ` of user ${id}`,
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
    conditions['entity_id'] = currentUser.entity_id || null;
    return this.userDB.findBy(conditions, output);
  }

  async update(
    currentUser: ICurrentUser,
    id: string,
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
      id: id,
      deleted_on: null,
      tenant_id: currentUser.tenant_id,
      entity_id: currentUser.entity_id || null
    };
    const [result] = await this.userDB.update(whereCondition, userObj, output);
    await this.systemAuditLogService.create(currentUser.tenant_id, {
      audit_code: eventHeading || SYSTEM_AUDIT_CODES.USER_MODIFIED,
      audit_text: eventString || ( SYSTEM_AUDIT_LOG_STRINGS.USER_MODIFIED + ` of id ${id} `),
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
      entity_id: currentUser.entity_id || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    };
    const [result] = await this.userDB.create(newUser, output);
    await this.systemAuditLogService.create(currentUser.tenant_id, {
      audit_code: SYSTEM_AUDIT_CODES.USER_CREATED,
      audit_text: SYSTEM_AUDIT_LOG_STRINGS.USER_CREATED + ` of id ${result.id}`,
      user_id: currentUser.id,
    });
    return result;
  }

  async delete(currentUser: ICurrentUser, id: string): Promise<boolean> {
    const result = await this.userDB.markAsDelete(
      currentUser.tenant_id,
      currentUser.id,
      id,
      currentUser.entity_id,
    );
    await this.systemAuditLogService.create(currentUser.tenant_id, {
      audit_code: SYSTEM_AUDIT_CODES.USER_DELETED,
      audit_text: SYSTEM_AUDIT_LOG_STRINGS.USER_DELETED + ` of id ${id}`,
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
        audit_code: SYSTEM_AUDIT_CODES.INVALID_PASSWORD,
        audit_text: SYSTEM_AUDIT_LOG_STRINGS.PASSWORD_CHANGE_FAILED + ` of user ${user.id}`,
        user_id: currentUser.id,
      });
      throw new PasswordMismatchException(user.id);
    }
    const userObj = {
      password_digest: this.encrypter.encryptPassword(input.new_password),
    };
    return this.update(
      currentUser,
      user.id,
      userObj,
      output,
      SYSTEM_AUDIT_LOG_STRINGS.PASSWORD_CHANGE_SUCCESS + ` of user ${user.id}`,
      SYSTEM_AUDIT_CODES.PASSWORD_UPDATED
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
      conditions[`${TABLE.USER}.entity_id`] = current_user.entity_id || null;
      return this.userDB.listExcludedUsers(userIds, conditions);
    } else {
      return [];
    }
  }
}
