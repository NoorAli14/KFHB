import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class KeyValInput {
    @Field()
    record_key: string;

    @Field()
    record_value: string;
}
