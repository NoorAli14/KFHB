import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ENT_PaginationModel {
  @Field({ nullable: true })
  total: number;

  @Field({ nullable: true })
  pages: number;

  @Field({ nullable: true })
  pageSize: number;

  @Field({ nullable: true })
  page: number;
}
