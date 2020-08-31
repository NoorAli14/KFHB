import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @Field(() => ID)
  id?: string;

  @Field()
  session_id: string;

  @Field()
  tenant_id: string;

  @Field()
  document_type_id?: string;

  @Field()
  attachable_id?: string;

  @Field({ nullable: true })
  processed_data?: string;

  @Field({ nullable: true })
  status?: string;

  @Field()
  created_by: string;

  @Field()
  created_on?: Date;

  @Field()
  updated_by: string;

  @Field()
  updated_on?: Date;

  @Field()
  deleted_by: string;

  @Field()
  deleted_on?: Date;
}
