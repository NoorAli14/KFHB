import {Field, InputType} from "@nestjs/graphql";
import {IsIn, IsString} from "class-validator";

@InputType()
export class SortingParam {
  @Field()
  @IsString()
  field: string;

  @Field()
  @IsString()
  @IsIn(["asc", "desc"])
  direction: string;
}
