import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class PaginationParams {
  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  page: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  limit: number;
}
