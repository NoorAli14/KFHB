import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Delete,
  Put,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './post.dto';
import { Post as PostModel } from './post.model';

@ApiTags('Post')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Get()
  @ApiResponse({ status: 200 })
  async list(): Promise<PostModel[]> {
    return this.postService.list(['id']);
  }
  @Post()
  @ApiCreatedResponse({
    description: 'User has been successfully created.',
  })
  @ApiUnprocessableEntityResponse()
  async create(@Body() userDto: CreatePostDto): Promise<PostModel> {
    const user = await this.postService.create(userDto, ['id']);
    return user;
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'User has been successfully update.',
  })
  @ApiUnprocessableEntityResponse()
  async update(
    @Param('id') id: string,
    @Body() userDto: CreatePostDto,
  ): Promise<PostModel> {
    const user = await this.postService.update(id, userDto, ['id']);
    return user;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The found record',
    type: PostModel,
  })
  async findOne(@Param('id') id: string): Promise<PostModel> {
    try {
      const user = await this.postService.findById(id, ['id']);
      if (!user) throw new NotFoundException(`User not fuond`);
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'User successfully delete',
  })
  delete(@Param('id') id: string): Promise<boolean> {
    return this.postService.delete(id);
  }
}
