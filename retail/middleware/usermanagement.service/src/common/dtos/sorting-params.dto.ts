import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsOptional, IsString } from 'class-validator';

@InputType()
export class SortingParam {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  sort_by: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort_order: string;
}
