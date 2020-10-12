import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ICurrentUser } from '@common/interfaces';
import { CurrentUser } from '@common/decorators';
import { ScreenshotsService } from './screenshots.service';
import { NewScreenshotInput } from './screenshot.dto';

@Resolver()
export class ScreenshotsResolver {
  constructor(private readonly screenshotService: ScreenshotsService) {}

  @Mutation(() => String)
  async addScreenshot(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('input') input: NewScreenshotInput,
  ): Promise<any> {
    return this.screenshotService.create(currentUser, input, [
      'id',
      'name',
      'created_on',
      'updated_on',
    ]);
  }

  @Query(() => String)
  async findScreenshot(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('tag_name') tag_name: string,
  ): Promise<any> {
    return this.screenshotService.findByTagName(currentUser, tag_name, [
      'id',
      'name',
      'created_on',
      'updated_on',
    ]);
  }
}
