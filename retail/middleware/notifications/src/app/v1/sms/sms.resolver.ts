import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { SMSService } from './sms.service';
import { SendSMSInput } from './sms.dto';
import { SMS } from './sms.model';
import { graphqlFields } from '@common/utilities';

@Resolver(SMS)
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {}

  @Mutation(() => SMS)
  async sendSMS(@Args('input') input: SendSMSInput, @Info() info: Record<string, any>): Promise<SMS | any> {
        const keys = graphqlFields(info);

    return this.smsService.sendSMS(input, keys);
  }
}
