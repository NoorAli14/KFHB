import {
  Resolver,
  Mutation,
  Args,
  GraphQLExecutionContext,
  Context,
} from '@nestjs/graphql';
import { Fields } from '@common/decorators';
import { Notify } from './notify.model';
import { NotifyService } from './notify.service';
import { NotifyInput } from './notify.dto';
import { getTenantID, getMutateProps } from '@rubix/common/utilities';

@Resolver(Notify)
export class NotifyResolver {

  constructor(
    private readonly notifyService: NotifyService,
  ) {}

  @Mutation(() => Notify)
  sendPushNotification(
    @Args('input') input: NotifyInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<Notify> {
    // input['tenant_id'] = getTenantID(context['req'].headers);
    input = getMutateProps('created', context['req'].headers, input);
    return this.notifyService.sendPushNotification(input, columns);
  }
}
