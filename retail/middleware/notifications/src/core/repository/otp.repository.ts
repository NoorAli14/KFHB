import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class OtpRepository extends BaseRepository {
  columns: string[] = ['id', 'user_id', 'otp', 'created_on', 'updated_on'];
  constructor() {
    super(TABLE.OTP);
  }

  // Create or Update OTP in user_OTP Table.

  async findByUserId(user_id: string): Promise<any> {
    return await this.connection
      // .table(this.tableName)
      .where('user_id', user_id)
      .select(this.columns);
  }
}
