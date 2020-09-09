import { MaxLength, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateSessionInput')
export class NewDocumentInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  type: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  file: string;
}
