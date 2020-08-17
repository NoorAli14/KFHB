import { Injectable } from '@nestjs/common';
import * as randomize from 'randomatic';

import { OtpRepository } from '@rubix/core/repository/';
import { Otp } from './otp.model';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';

@Injectable()
export class OtpService {
  constructor(
    private readonly otpDB: OtpRepository,
    private readonly _config: ConfigurationService
  ) {}

  async findByUserId(user_id: string, columns?: string[]): Promise<Otp> {
    return this.otpDB.findBy({ user_id: user_id }, columns);
  }

  async update(
    id: string,
    otpOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<Otp> {
    const [otp] = await this.otpDB.update({ id }, otpOBJ, columns);
    return otp;
  }

  async create(
    otpOBJ: { [key: string]: any },
    columns?: string[],
  ): Promise<Otp> {
    otpOBJ.otp_code = await randomize(
      this._config.OTP.pattern,
      this._config.OTP.otp_length,
    );
    otpOBJ.status = this._config.OTP.status;
    otpOBJ.created_on = new Date();
    otpOBJ.created_by = otpOBJ.user_id;
    otpOBJ.updated_on = new Date();
    otpOBJ.updated_by = otpOBJ.user_id;

    const [otp] = await this.otpDB.create(otpOBJ, columns);
    return otp;
  }
}
