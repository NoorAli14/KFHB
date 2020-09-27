import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import { KeyValInput } from "@common/inputs/key-val.input";
import {UserService} from "@app/v1/users/users.service";
import {Encrypter} from "@common/encrypter";
import {MESSAGES, NUMBERS} from "@common/constants";
import {ChangePasswordInput, ForgotPasswordInput} from "@app/v1/forgot-password/forgot-password.dto";
import {addMinutes, generateRandomString} from "@common/utilities";
import {ConfigurationService} from "@common/configuration/configuration.service";
import { ICurrentUser } from '@common/interfaces';
import { UserNotFoundException } from '../users/exceptions';

@Injectable()
export class ForgotPasswordService {
  constructor(private readonly userService: UserService,
              private readonly encrypter: Encrypter,
              private readonly configService: ConfigurationService) {}

  async verifyAndGetToken(currentUser: ICurrentUser, forgetPasswordInput: ForgotPasswordInput, output?: string[]): Promise<any> {
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
    const [user] = await this.userService.findByProperty(currentUser, check, ['id']);
    if(!user) throw new UserNotFoundException(currentUser.id);

    const hash = generateRandomString(NUMBERS.TOKEN_LENGTH);
    const fp_output = {
      password_reset_token : hash,
      password_reset_token_expiry : addMinutes(this.configService.APP.INVITATION_TOKEN_EXPIRY)
    };
    return this.userService.update(currentUser, user.id, fp_output, output);
  }

  async changePassword(currentUser: ICurrentUser, changePasswordInput: ChangePasswordInput, output?: string[]): Promise<any> {
    const check: KeyValInput[] = [
      {
        record_key: 'password_reset_token',
        record_value: changePasswordInput.password_reset_token
      },
      {
        record_key: 'deleted_on',
        record_value: null
      }];
    const [user] = await this.userService.findByProperty(currentUser, check, ['id', 'password_reset_token_expiry']);
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
      return this.userService.update(currentUser, user.id, input, output);
    }else{
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: MESSAGES.TOKEN_EXPIRED,
      }, HttpStatus.UNAUTHORIZED);
    }
  }
}
