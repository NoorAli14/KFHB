import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

@InputType()
export class IdsInput {
    @Field()
    id: string;

    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    _deleted?: boolean;
}
