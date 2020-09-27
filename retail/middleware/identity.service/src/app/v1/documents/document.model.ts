import { Field, ObjectType, ID, createUnionType } from '@nestjs/graphql';
@ObjectType()
export class Document {
  @Field(() => ID)
  id?: string;

  @Field()
  name?: string;

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

@ObjectType()
export class PreviewDocument {
  @Field()
  image: string;
}

@ObjectType()
export class SCHEMA_ERROR {

  @Field()
  group: string;
  @Field({ nullable: true })
  errorCode: string;
  @Field()
  message: string;
  @Field({ nullable: true })
  field?: string;
  @Field({ nullable: true })
  stack: string;
  @Field({ nullable: true })
  value?: string;
}

@ObjectType()
export class CUSTOM_ERROR {
  @Field()
  valid: boolean
  @Field(() => [SCHEMA_ERROR], { nullable: true })
  errors: SCHEMA_ERROR[];
}

export const ResultUnion = createUnionType({
  name: 'Result',
  types: () => [Document, CUSTOM_ERROR],
  resolveType(value) {
    if (value.id) {
      return Document;
    }
    return CUSTOM_ERROR;
  },
});