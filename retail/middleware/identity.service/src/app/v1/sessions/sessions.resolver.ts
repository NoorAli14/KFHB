import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@rubix/common/guards';
import { Fields, CurrentUser, Tenant } from '@rubix/common/decorators';
import { Session } from './session.model';
import { SessionsService } from './sessions.service';
import { NewSessionInput } from './session.dto';

@Resolver(Session)
@UseGuards(AuthGuard)
export class SessionsResolver {
  constructor(private readonly sessionService: SessionsService) {}

  // @Query(() => [Session])
  // users(@Fields() columns: string[]): Promise<Session[]> {
  //   return this.userService.list(columns);
  // }

  // @Query(() => User)
  // async findUser(
  //   @Args('id', ParseUUIDPipe) id: string,
  //   @Fields() columns: string[],
  // ): Promise<Session> {
  //   const user: Session = await this.userService.findById(id, columns);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }

  @Mutation(() => Session)
  addSession(
    @Args('input') input: NewSessionInput,
    @CurrentUser() user: any,
    @Tenant() tenant: any,
    @Fields() columns: string[],
  ): Promise<Session> {
    const params: Session = {
      user_id: user.id,
      tenant_id: tenant.id,
      reference_id: input.reference_id,
      status: 'ACTIVE',
      created_by: user.id,
      updated_by: user.id,
    };
    return this.sessionService.create(params, columns);
  }

  // @Mutation(() => Session)
  // updateUser(
  //   @Args('id', ParseUUIDPipe) id: string,
  //   @Args('input') input: UpdateUserInput,
  //   @Fields() columns: string[],
  // ): Promise<Session> {
  //   return this.userService.update(id, input, columns);
  // }

  // @Mutation(() => Boolean)
  // async deleteUser(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
  //   const user: Session = await this.userService.findById(id, ['id']);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return this.userService.delete(id);
  // }
}
