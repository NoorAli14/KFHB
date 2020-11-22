import { Injectable } from '@nestjs/common';

import { Encrypter } from '@common/encrypter';
import {
  NUMBERS,
  STATUS,
  SYSTEM_AUDIT_CODES,
  SYSTEM_AUDIT_LOG_STRINGS,
} from '@common/constants';
import {
  ChangePasswordInput,
  ForgotPasswordInput,
} from '@app/v1/forgot-password/forgot-password.dto';
import {
  addMinutes,
  generateRandomString,
  getCurrentTimeStamp,
} from '@common/utilities';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { ITenant } from '@common/interfaces';
import { UserRepository } from '@core/repository';
import { TokenInvalidOrExpiredException } from './exceptions';
import { User } from '../users/user.model';
import { UserNotFoundException } from '../users/exceptions';
import { SystemAuditLogService } from '@app/v1/system-audit-log/system-audit-log.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly userDB: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly configService: ConfigurationService,
    private readonly systemAuditLogService: SystemAuditLogService,
  ) {}

  async verifyAndGetToken(
    tenant: ITenant,
    input: ForgotPasswordInput,
    output?: string[],
  ): Promise<User> {
    const user: User = await this.userDB.findByTenantIdAndEmail(
      tenant.id,
      input.email,
      ['id', 'tenant_id'],
    );
    if (!user) {
      await this.systemAuditLogService.create(tenant.id, {
        audit_code: SYSTEM_AUDIT_CODES.FORGET_PASSWORD_REQUEST,
        audit_text:
          SYSTEM_AUDIT_LOG_STRINGS.PASSWORD_RESET_REQUEST_FAILED +
          ` with email ${input.email}`,
      });
      throw new UserNotFoundException(input.email);
    }
    const hash = generateRandomString(NUMBERS.TOKEN_LENGTH);
    const updateParams = {
      password_reset_token: hash,
      password_reset_token_expiry: addMinutes(
        this.configService.APP.INVITATION_TOKEN_EXPIRY,
      ),
      updated_by: user.id,
      updated_on: getCurrentTimeStamp(),
    };
    const whereCondition = {
      id: user.id,
      tenant_id: tenant.id,
      status: STATUS.ACTIVE,
      deleted_on: null,
    };
    const [result] = await this.userDB.update(
      whereCondition,
      updateParams,
      output,
    );
    await this.systemAuditLogService.create(tenant.id, {
      audit_code: SYSTEM_AUDIT_CODES.FORGET_PASSWORD_REQUEST,
      audit_text:
        SYSTEM_AUDIT_LOG_STRINGS.PASSWORD_RESET_REQUEST_SUCCESS +
        ` with email ${input.email}`,
      user_id: user.id
    });
    return result;
  }

  async changePassword(
    tenant: ITenant,
    input: ChangePasswordInput,
    output?: string[],
  ): Promise<User> {
    const user: User = await this.userDB.findByTenantIdAndToken(
      tenant.id,
      input.password_reset_token,
      ['id', 'password_reset_token_expiry'],
    );
    if (!user) {
      await this.systemAuditLogService.create(tenant.id, {
        audit_code: SYSTEM_AUDIT_CODES.PASSWORD_UPDATE_FAILED,
        audit_text: SYSTEM_AUDIT_LOG_STRINGS.PASSWORD_RESET_FAILED_WRONG_TOKEN,
      });
      throw new TokenInvalidOrExpiredException(input.password_reset_token);
    }
    if (user?.password_reset_token_expiry?.getTime() > new Date().getTime()) {
      const updateParams = {
        password_digest: this.encrypter.encryptPassword(input.password),
        password_reset_token_expiry: null,
        password_reset_token: null,
        updated_by: user.id,
      };
      const whereCondition = {
        id: user.id,
        deleted_on: null,
        tenant_id: tenant.id,
      };
      const [result] = await this.userDB.update(
        whereCondition,
        updateParams,
        output,
      );
      await this.systemAuditLogService.create(tenant.id, {
        audit_code: SYSTEM_AUDIT_CODES.PASSWORD_UPDATED,
        audit_text: SYSTEM_AUDIT_LOG_STRINGS.PASSWORD_RESET_SUCCESS + ` of user ${user.id}`,
        user_id: user.id
      });
      return result;
    } else {
      await this.systemAuditLogService.create(tenant.id, {
        audit_code: SYSTEM_AUDIT_CODES.PASSWORD_UPDATE_FAILED,
        audit_text:
          SYSTEM_AUDIT_LOG_STRINGS.PASSWORD_RESET_FAILED_TIMED_OUT_TOKEN,
        user_id: user.id
      });
      throw new TokenInvalidOrExpiredException(input.password_reset_token);
    }
  }
}
