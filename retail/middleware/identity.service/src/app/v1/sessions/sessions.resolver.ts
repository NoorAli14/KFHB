import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { uuid } from '@rubix/common';
import { UseGuards, Logger } from '@nestjs/common';
import { AuthGuard, Fields, CurrentUser, ICurrentUser } from '@rubix/common';
import { Session } from './session.model';
import { SessionsService } from './sessions.service';
import { NewFaceInput } from '../faces/face.dto';
import { NewSessionInput } from './session.dto';
import { EVALUATION_RESPONSE } from './session.interface';

@Resolver(Session)
@UseGuards(AuthGuard)
export class SessionsResolver {
  private readonly __logger: Logger = new Logger(SessionsResolver.name);
  constructor(private readonly sessionService: SessionsService) {}

  @Mutation(() => Session)
  addSession(
    @CurrentUser() currentUser: ICurrentUser,
    @Fields() output: string[],
  ): Promise<Session> {
    const input: NewSessionInput = {
      reference_id: uuid(),
    };
    return this.sessionService.create(currentUser, input, output);
  }

  @Mutation(() => Session)
  updateSession(
    @Args('input') input: NewFaceInput,
    @CurrentUser() currentUser: ICurrentUser,
    @Fields() output: string[],
  ): Promise<Session> {
    return this.sessionService.update(currentUser, input, output);
  }

  @Mutation(() => EVALUATION_RESPONSE)
  evaluation(
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<EVALUATION_RESPONSE> {
    return this.sessionService.evaluation(currentUser);
  }
}
