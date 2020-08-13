import { Injectable } from '@nestjs/common';
import { OtpRepository } from '@rubix/core/repository/';
import { Otp } from './otp.model';

@Injectable()
export class OtpService {
  constructor(private otpDB: OtpRepository) {}

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
    const [otp] = await this.otpDB.create(otpOBJ, columns);
    return otp;
  }
}
