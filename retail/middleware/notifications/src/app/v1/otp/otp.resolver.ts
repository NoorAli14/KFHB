import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
// import { Fields } from '@common/decorators';
import { Fields } from '../../../common/decorators';
import { Otp } from './otp.model';
import { OtpService } from './otp.service';
import { GenerateOTPInput } from './otp.dto';

@Resolver(Otp)
export class OtpResolver {

  constructor(
    private readonly otpService: OtpService,
  ) {}


  // @Query(() => Post)
  // async findPost(@Args('id', ParseUUIDPipe) id: string, @Fields() columns: string[]): Promise<Post> {
  //   const post: Post = await this.postService.findById(id, columns);
  //   if(!post) {
  //     throw new NotFoundException('Post not found');
  //   }
  //   return post;
  // }

  @Mutation(() => Otp)
  generateOtp(
    @Args('input') input: GenerateOTPInput,
    @Fields() columns: string[]
  ): Promise<Otp> {
    return this.otpService.create(input, columns);
  }

  // @Mutation(() => Otp)
  // verifyOtp(
  //   @Args('id', ParseUUIDPipe) id: string,
  //   @Args('input') input: UpdatePostInput,
  //   @Fields() columns: string[]
  // ): Promise<Post> {
  //   return this.postService.update(id, input, columns);
  // }
}
