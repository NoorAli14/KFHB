import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class IdsInput {
  @Field()
  @IsString()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  _deleted?: boolean;
}
