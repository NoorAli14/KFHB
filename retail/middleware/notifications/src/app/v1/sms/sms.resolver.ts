import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { SMSService } from './sms.service';
import { SendSMSInput } from './sms.dto';
import { SMSGQL } from './sms.model';
import { graphqlFields } from '@common/utilities';

@Resolver(SMSGQL)
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {}

  @Mutation(() => SMSGQL)
  async sendSMS(@Args('input') input: SendSMSInput, @Info() info: Record<string, any>): Promise<SMSGQL> {
        const keys = graphqlFields(info);

    return this.smsService.sendSMS(input, keys);
  }
}
