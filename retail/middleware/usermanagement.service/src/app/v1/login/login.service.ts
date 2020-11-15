import { Injectable } from '@nestjs/common';
import { LoginInput } from '@app/v1/login/login.dto';
import { Encrypter } from '@common/encrypter';
import { ITenant } from '@common/interfaces';
import { UserRepository } from '@core/repository';
import { User } from '../users/user.model';
import { InvalidEmailPasswordException } from './exceptions/invalid-email-password.exception';

@Injectable()
export class LoginService {
  constructor(private userDB: UserRepository, private encrypter: Encrypter) {}

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
    if (
      user &&
      this.encrypter.comparePassword(input.password, user.password_digest)
    ) {
      delete user.password_digest;
      return user;
    }
    throw new InvalidEmailPasswordException(input.email);
  }
}
