import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import { KeyValInput } from "@common/inputs/key-val.input";
import {UserService} from "@app/v1/users/users.service";
import {Encrypter} from "@common/encrypter";
import {MESSAGES, NUMBERS} from "@common/constants";
import {ChangePasswordInput, ForgotPasswordInput} from "@app/v1/forgot-password/forgot-password.dto";
import {addMinutes, generateRandomString} from "@common/utilities";
import {ConfigurationService} from "@common/configuration/configuration.service";

@Injectable()
export class ForgotPasswordService {
  constructor(private readonly userService: UserService,
              private readonly encrypter: Encrypter,
              private readonly configService: ConfigurationService) {}

  async verifyAndGetToken(forgetPasswordInput: ForgotPasswordInput, keys?: string[]): Promise<any> {
    const check: KeyValInput[] = [
      {
        record_key: 'email',
        record_value: forgetPasswordInput.email
      },
      {
        record_key: 'deleted_on',
        record_value: null
      }
    ];
    const [user] = await this.userService.findByProperty(check, ['id']);
    if(!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.INVALID_EMAIL,
    }, HttpStatus.NOT_FOUND);

    const hash = generateRandomString(NUMBERS.TOKEN_LENGTH);
    const fp_output = {
      password_reset_token : hash,
      password_reset_token_expiry : addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY)
    };
    return this.userService.update(user.id, fp_output, keys);
  }

  async changePassword(changePasswordInput: ChangePasswordInput, keys?: string[]): Promise<any> {
    const check: KeyValInput[] = [
      {
        record_key: 'password_reset_token',
        record_value: changePasswordInput.password_reset_token
      },
      {
        record_key: 'deleted_on',
        record_value: null
      }];
    const [user] = await this.userService.findByProperty(check, ['id', 'password_reset_token_expiry']);
    if(!user) throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: MESSAGES.INVALID_TOKEN,
    }, HttpStatus.UNAUTHORIZED);

    // todo  - user momentjs and write util methods
    if(Date.parse(user.password_reset_token_expiry) && (Date.parse(user.password_reset_token_expiry) > Date.parse(new Date().toString()))){
      const input = {
        password_digest : this.encrypter.encryptPassword(changePasswordInput.password),
        password_reset_token_expiry : null,
        password_reset_token: null
      };
      return this.userService.update(user.id, input, keys);
    }else{
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: MESSAGES.TOKEN_EXPIRED,
      }, HttpStatus.UNAUTHORIZED);
    }
  }
}
