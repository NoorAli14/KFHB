import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EVALUATION_RESPONSE {
  @Field()
  success: boolean;
  @Field()
  status: string;
  @Field({ nullable: true })
  message?: string;
}

export interface MISMATCHED_DOCUMENT {
  name: string;
  score?: string;
  threshold?: string;
  result?: string;
}
