import { Injectable } from '@nestjs/common';

import { Encrypter } from '@common/encrypter';
import { NUMBERS, STATUS } from '@common/constants';
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

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly userDB: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly configService: ConfigurationService,
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
    if (!user) throw new UserNotFoundException(input.email);
    const hash = generateRandomString(NUMBERS.TOKEN_LENGTH);
    const updateParams = {
      password_reset_token: hash,
      password_reset_token_expiry: addMinutes(
        this.configService.APP.INVITATION_TOKEN_EXPIRY,
      ),
      updated_by: user.id,
      updated_on: getCurrentTimeStamp(), // TODO: use knex timestamps
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
    if (!user)
      throw new TokenInvalidOrExpiredException(input.password_reset_token);

    // todo  - user momentjs and write util methods
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
      return result;
    } else {
      throw new TokenInvalidOrExpiredException(input.password_reset_token);
    }
  }
}
