import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SMSService } from './sms.service';
import { SendSMSInput } from './sms.dto';
import { SMS } from './sms.model';

@Resolver(SMS)
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {}

  @Mutation(() => SMS)
  async sendSMS(@Args('input') input: SendSMSInput): Promise<SMS | any> {
    return this.smsService.sendSMS(input);
  }
}
