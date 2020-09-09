import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { SMSService } from './sms.service';
import { SendSMSInput } from './sms.dto';
import { SMS } from './sms.model';
import { Fields } from '@rubix/common/decorators';

@Resolver(SMS)
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {}

  @Mutation(() => SMS)
  async sendSMS(@Args('input') input: SendSMSInput, @Fields() columns: string[]): Promise<SMS | any> {
    return this.smsService.sendSMS(input, columns);
  }
}
