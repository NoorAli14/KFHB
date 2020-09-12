import { Injectable } from '@nestjs/common';

@Injectable()
export class AmlRequestService {
  //Get customer details
  async findUserById(customer_id: string): Promise<any> {
    // Here we call the identity service to fetch user details
    return;
  }

  async checkAmlByUser(user: object): Promise<any> {
    return 'here we call identity service to fetch customer detail';
  }
}
