import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaginationModel {

  @Field({ nullable: true })
  from?: number;

  @Field({ nullable: true })
  to?: number;

  @Field({ nullable: true })
  total?: number;

  @Field({ nullable: true })
  perPage?: number;

  @Field({ nullable: true })
  currentPage?: number;

  @Field({ nullable: true })
  lastPage?: number;

  @Field({ nullable: true })
  offset?: number;
}
