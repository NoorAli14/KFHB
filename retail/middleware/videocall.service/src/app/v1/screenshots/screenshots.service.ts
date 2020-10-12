import { Injectable } from '@nestjs/common';
import { ICurrentUser } from '@common/interfaces';
import { NewScreenshotInput } from './screenshot.dto';

@Injectable()
export class ScreenshotsService {
  async create(
    currentUser: ICurrentUser,
    input: NewScreenshotInput,
    output?: string[],
  ): Promise<any> {
    return `This will return a screenshot after create entry in database`;
  }

  async findByTagName(
    currentUser: ICurrentUser,
    tag_name: string,
    output: string[],
  ) {
    return `This will return screenshot base on tag name  + [${tag_name}]`;
  }
}
