import { Injectable } from '@nestjs/common';
import { LoginInput } from '@app/v1/login/login.dto';
import { Encrypter } from '@common/encrypter';
import { ITenant } from '@common/interfaces';
import { UserRepository } from '@core/repository';
import { User } from '../users/user.model';
import { InvalidEmailPasswordException } from './exceptions/invalid-email-password.exception';
import { SystemAuditLogService } from '@app/v1/system-audit-log/system-audit-log.service';
import { SYSTEM_AUDIT_CODES, SYSTEM_AUDIT_LOG_STRINGS } from '@rubix/common';

@Injectable()
export class LoginService {
  constructor(
    private userDB: UserRepository,
    private encrypter: Encrypter,
    private systemAuditLogService: SystemAuditLogService,
  ) {}

  async verifyUser(
    tenant: ITenant,
    input: LoginInput,
    output: string[],
  ): Promise<User> {
    output.push('password_digest');
    const user: User = await this.userDB.findByTenantIdAndEmail(
      tenant.id,
      input.email,
      output,
    );
    if (user) {
      if (this.encrypter.comparePassword(input.password, user.password_digest)) {
        delete user.password_digest;
        await this.systemAuditLogService.create(tenant.id, {
          audit_code: SYSTEM_AUDIT_CODES.LOGIN_USER_SUCCESS,
          audit_text:
            SYSTEM_AUDIT_LOG_STRINGS.LOGIN_USER_SUCCESS + ` with email ${input.email}`,
          user_id: user.id
        });
        return user;
      } else {
        await this.systemAuditLogService.create(tenant.id, {
          audit_code: SYSTEM_AUDIT_CODES.LOGIN_USER_FAILED,
          audit_text:
            SYSTEM_AUDIT_LOG_STRINGS.LOGIN_USER_FAILED + ` due to wrong password with email ${input.email}`,
          user_id: user.id
        });
      }
    } else {
      await this.systemAuditLogService.create(tenant.id, {
        audit_code: SYSTEM_AUDIT_CODES.LOGIN_USER_FAILED,
        audit_text:
          SYSTEM_AUDIT_LOG_STRINGS.LOGIN_USER_FAILED + `. No user found with email ${input.email}`,
      });
    }
    throw new InvalidEmailPasswordException(input.email);
  }
}
