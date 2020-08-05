import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { SendEmailInput } from './email.dto';
import { EmailGQL } from './email.model';
import { graphqlKeys } from '@common/utilities';

@Resolver(EmailGQL)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => EmailGQL)
  async sendEmail(@Args('input') input: SendEmailInput, @Info() info: Record<string, any>): Promise<EmailGQL> {
        const keys = graphqlKeys(info);

    return this.emailService.sendEmail(input, keys);
  }
}
