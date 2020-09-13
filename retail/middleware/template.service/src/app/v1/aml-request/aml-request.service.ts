import { Injectable } from '@nestjs/common';
import { NewAlmRequestInput } from './aml-request-dot';
import { AmlRequest } from './aml.request.model';
import { AmlRequestRepository } from '@core/repository/aml-request-repository';

@Injectable()
export class AmlRequestService {
  constructor(private readonly amlRequestDB: AmlRequestRepository) {}
  //Get customer details
  async findUserById(customer_id: string): Promise<any> {
    // Here we call the identity service to fetch user details
    return;
  }

  async checkAmlByUser(user: object): Promise<any> {
    return 'here we call identity service to fetch customer detail';
  }

  async create(
    newAmlRequest: NewAlmRequestInput,
    keys?: string[],
  ): Promise<AmlRequest> {
    const [response] = await this.amlRequestDB.create(newAmlRequest, keys);
    return response;
  }
}
