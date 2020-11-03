import {Field, InputType} from "@nestjs/graphql";
import {IsISO8601, IsString} from "class-validator";

@InputType()
export class CreatedOnParams {
  @Field()
  @IsString()
  @IsISO8601({strict: true})
  start: string;

  @Field()
  @IsString()
  @IsISO8601({strict: true})
  end: string;
}
