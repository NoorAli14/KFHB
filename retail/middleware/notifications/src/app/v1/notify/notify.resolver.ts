import {
  Resolver,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { Fields } from '@common/decorators';
import { Notify } from './notify.model';
import { NotifyService } from './notify.service';
import { NotifyInput } from './notify.dto';

@Resolver(Notify)
export class NotifyResolver {

  constructor(
    private readonly notifyService: NotifyService,
  ) {}

  @Mutation(() => Notify)
  sendPushNotification(
    @Args('input') input: NotifyInput,
    @Fields() columns: string[]
  ): Promise<Notify> {
    return this.notifyService.sendPushNotification(input, columns);
  }
}
