import {Field} from "@nestjs/graphql";
import {IsNumber} from "class-validator";

export class QueryParams {
  @Field()
  @IsNumber()
  page: number;

  @Field()
  @IsNumber()
  limit: number;
}
