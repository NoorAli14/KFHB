import { Injectable } from '@nestjs/common';
import { NewAlmResponseInput } from './aml-response-dot';
import { AmlResponseRepository } from '@core/repository/aml-response-repository';

@Injectable()
export class AmlResponseService {
  constructor(private readonly amlResponseDB: AmlResponseRepository) {}

  async getAmlStatus(
    user_id: string,
    reference_no: string,
    keys: string[],
  ): Promise<any> {
    //Here we will check the aml status based on reference number
    const newAmlResponse: NewAlmResponseInput = {
      created_by: 'Test User',
      updated_by: 'Test User',
      response_type: 'Test Aml Response',
      request_id: 'E8A8C575-DAC7-4326-A0A2-61D2D1E3476D',
      response_status: 'Status here',
    };

    const [response] = await this.amlResponseDB.create(newAmlResponse, keys);
    return response;
  }
}
