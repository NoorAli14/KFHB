import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaginationModel {

  @Field({ nullable: true })
  total?: number;

  @Field({ nullable: true })
  pages?: number;

  @Field({ nullable: true })
  perPage?: number;

  @Field({ nullable: true })
  current?: number;

  @Field({ nullable: true })
  next?: number;

  @Field({ nullable: true })
  prev?: number;

  @Field({ nullable: true })
  isFirst?: boolean;

  @Field({ nullable: true })
  isLast?: boolean;
}
