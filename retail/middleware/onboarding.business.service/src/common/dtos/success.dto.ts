import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @ApiProperty({
    example: 'SUCCESS',
  })
  readonly status: string;

  @ApiProperty({ required: false })
  readonly message?: string;

  @ApiProperty({ required: false })
  readonly expired_at?: Date;
}
