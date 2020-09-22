import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { SendEmailInput } from './email.dto';
import { EmailGQL } from './email.model';

@Resolver(EmailGQL)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => EmailGQL)
  sendEmail(
    @Args('input') input: SendEmailInput,
  ): Promise<EmailGQL | any> {
    return  this.emailService.sendEmail(input);
  }
}
