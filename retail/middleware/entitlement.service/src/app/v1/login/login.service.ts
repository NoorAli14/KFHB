import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {KeyValInput} from "@common/inputs/key-val-input";
import {UserService} from "@app/v1/users/users.service";
import {LoginInput} from "@app/v1/login/login.dto";
import {Encrypter} from "@common/encrypter";
import {MESSAGES, STATUS} from "@common/constants";

@Injectable()
export class LoginService {
  constructor(private userService: UserService, private encrypter: Encrypter) {}

  async verifyUser(loginInput: LoginInput): Promise<any> {
    const check: KeyValInput[] = [
      {
        record_key: 'email',
        record_value: loginInput.email
      },
      {
        record_key: 'status',
        record_value: STATUS.ACTIVE
      }
    ];
    const keys = ['*'];
    const results = await this.userService.findByProperty(check, keys);
    if (results.length && results.length > 0) {
      const user = results[0];
      if (this.encrypter.comparePassword(loginInput.password, user.password_digest)){
        return user;
      } else {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: MESSAGES.INVALID_Email_OR_PASSWORD,
        }, HttpStatus.UNAUTHORIZED);
      }
    }
    throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: MESSAGES.INVALID_Email_OR_PASSWORD,
    }, HttpStatus.UNAUTHORIZED);
  }
}
