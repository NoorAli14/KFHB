import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, Fields, CurrentUser, ICurrentUser } from '@rubix/common';
import { Face } from './face.model';
import { FacesService } from './faces.service';
import { NewFaceInput } from './face.dto';

@Resolver(Face)
@UseGuards(AuthGuard)
export class FacesResolver {
  constructor(private readonly faceService: FacesService) {}

  @Mutation(() => Face)
  uploadLiveness(
    @Args('input') input: NewFaceInput,
    @CurrentUser() currentUser: ICurrentUser,
    @Fields() columns: string[],
  ): Promise<Face> {
    return this.faceService.uploadLiveness(currentUser, input, columns);
  }
}
