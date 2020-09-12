import { Injectable } from '@nestjs/common';

@Injectable()
export class AmlResponseService {
  async getAmlStatus(user_id: string, reference_no: string): Promise<any> {
    //Here we will check the aml status based on reference number
    return;
  }
}
