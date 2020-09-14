import { MaxLength, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateSessionInput')
export class NewSessionInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  reference_id: string;
}
