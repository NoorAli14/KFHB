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

    // otpOBJ.delivery_mode = "email";
    // otpOBJ.email = "ahmad.raza@virtualforce.io";
    otpOBJ.otp_code = 1123456;
    otpOBJ.status = "Not varified";
    otpOBJ.created_on = new Date();
    otpOBJ.created_by = otpOBJ.user_id;
    otpOBJ.updated_on = new Date();
    otpOBJ.updated_by = otpOBJ.user_id;

    const [otp] = await this.otpDB.create(otpOBJ, columns);
    return otp;
  }
}
