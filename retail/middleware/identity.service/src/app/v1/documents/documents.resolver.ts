import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { uuid } from '@rubix/common';
import { UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  Fields,
  CurrentUser,
  Tenant,
  DOCUMENT_STATUSES,
} from '@rubix/common';
import { Document } from './document.model';
import { DocumentsService } from './documents.service';
import { NewDocumentInput } from './document.dto';

@Resolver(Document)
@UseGuards(AuthGuard)
export class DocumentsResolver {
  constructor(private readonly documentService: DocumentsService) {}

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

  @Mutation(() => Document)
  addDocument(
    @Args('input') input: NewDocumentInput,
    @CurrentUser() customer: any,
    @Tenant() tenant: any,
    @Fields() columns: string[],
  ): Promise<Document> {
    const params: any = {
      ...input,
      ...{
        customer_id: customer.id,
        tenant_id: tenant.id,
        status: DOCUMENT_STATUSES.PROCESSING,
        created_by: customer.id,
        updated_by: customer.id,
      },
    };
    return this.documentService.create(params, columns);
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
