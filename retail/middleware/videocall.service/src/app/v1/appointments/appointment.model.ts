import { ApiProperty } from '@nestjs/swagger';

export class Option {
  readonly id: string;

  @ApiProperty({
    example: 'Call Time',
    description: 'Scheduled time of the Call',
  })
  call_time: Date;

  @ApiProperty({
    example: 'male',
    description: 'Gender of the Agent',
  })
  gender: GENDER;

  @ApiProperty({
    example: 'male',
    description: 'Gender of the Agent',
  })
  status: APPOINTMENT_STATUS;

  @ApiProperty({
    example: 'e2fad381-d8b0-4531-a9f5-9c908dc9b54a',
    description: 'UUID of the Customer.',
  })
  user_id: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { GENDER, APPOINTMENT_STATUS } from '@common/constants';

@ObjectType()
export class OptionGQL {
  @Field()
  id: string;

  @Field()
  call_time: Date;

  @Field()
  gender: GENDER;

  @Field()
  status: APPOINTMENT_STATUS;

  user_id?: string;

  // @Field(() => UserGQL)
  // user?: UserGQL;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
