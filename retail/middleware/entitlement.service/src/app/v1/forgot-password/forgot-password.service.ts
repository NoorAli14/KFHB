import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {KeyValInput} from "@common/inputs/key-val-input";
import {UserService} from "@app/v1/users/users.service";
import {Encrypter} from "@common/encrypter";
import {MESSAGES, NUMBERS, STATUS} from "@common/constants";
import {ChangePasswordInput, ForgotPasswordInput, ForgotPasswordOutput} from "@app/v1/forgot-password/forgot-password.dto";
import {addMinutes, generateRandomString} from "@common/utilities";

@Injectable()
export class ForgotPasswordService {
  constructor(private userService: UserService, private encrypter: Encrypter) {}

  async verifyAndGetToken(forgetPasswordInput: ForgotPasswordInput): Promise<any> {
    const check: KeyValInput[] = [
      {
        record_key: 'email',
        record_value: forgetPasswordInput.email
      },
      {
        record_key: 'status',
        record_value: STATUS.ACTIVE
      }
    ];
    const keys = ['*'];
    const results = await this.userService.findByProperty(check, keys);
    if (results.length && results.length > 0) {
      const hash = generateRandomString(NUMBERS.TOKEN_LENGTH);
      const fp_output: ForgotPasswordOutput = {
        token : hash,
        token_expiry : addMinutes(NUMBERS.TOKEN_EXPIRY_IN_MINUTES)
      };
      await this.userService.update(results[0].id, fp_output, keys);
      return fp_output;
    }
    throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: MESSAGES.INVALID_EMAIL,
    }, HttpStatus.UNAUTHORIZED);
  }

  async changePassword(changePasswordInput: ChangePasswordInput): Promise<any> {
    const check: KeyValInput[] = [{
      record_key: 'token',
      record_value: changePasswordInput.token
    }];
    const keys = ['*'];
    const results = await this.userService.findByProperty(check, keys);
    if (results.length && results.length > 0) {
      const user = results[0];
      if(Date.parse(user.token_expiry) && (Date.parse(user.token_expiry) > Date.parse(new Date().toString()))){
        const input = {
          password_digest : this.encrypter.encryptPassword(changePasswordInput.password),
          token_expiry : null
        };
        await this.userService.update(results[0].id, input, keys);
        return MESSAGES.PASSWORD_UPDATED;
      }else{
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: MESSAGES.TOKEN_EXPIRED,
        }, HttpStatus.UNAUTHORIZED);
      }
    }
    throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: MESSAGES.INVALID_TOKEN,
    }, HttpStatus.UNAUTHORIZED);
  }
}
