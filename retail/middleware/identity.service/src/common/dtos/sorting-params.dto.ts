import {Field, InputType} from "@nestjs/graphql";
import {IsIn, IsString} from "class-validator";

@InputType()
export class SortingParam {
  @Field()
  @IsString()
  sort_by: string;

  @Field()
  @IsString()
  @IsIn(["asc", "desc"])
  sort_order: string;
}
