import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { SendEmailInput } from './email.dto';
import { EmailGQL } from './email.model';
import { graphqlFields } from '@common/utilities';
import { Fields } from '@rubix/common/decorators';

@Resolver(EmailGQL)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => EmailGQL)
  sendEmail(
    @Args('input') input: SendEmailInput,
    @Fields() columns: string[]
  ): Promise<EmailGQL | any> {
    return  this.emailService.sendEmail(input, columns);
  }
}
