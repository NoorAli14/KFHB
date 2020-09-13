import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class OtpRepository extends BaseRepository {
  columns: string[] = [
    'id',
    'user_id',
    'delivery_mode',
    'mobile_no',
    'email',
    'otp_code',
    'status',
    'created_on',
    'created_by',
  ];
  constructor() {
    super(TABLE.OTP);
  }

  async findByUserId(user_id: string): Promise<any> {
    return await this.connection
      .table(this.tableName)
      .where('user_id', user_id)
      .select(this.columns)
      .first()
      .orderBy('id', 'desc');
  }
}
