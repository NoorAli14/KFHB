import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Fields, CurrentUser } from '@common/decorators';
import { Notify } from './notify.model';
import { NotifyService } from './notify.service';
import { NotifyInput } from './notify.dto';

@Resolver(Notify)
export class NotifyResolver {
  constructor(private readonly notifyService: NotifyService) {}

  @Mutation(() => Notify)
  sendPushNotification(
    @Args('input') input: NotifyInput,
    @Fields() columns: string[],
    @CurrentUser() user: { [key: string]: any },
  ): Promise<Notify> {
    return this.notifyService.sendPushNotification(user, input, columns);
  }
}
