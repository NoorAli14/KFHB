import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class IdsDto {
  @ApiProperty({
    title: 'Object ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ required: false, example: 'true | false' })
  @IsOptional()
  @IsBoolean()
  readonly _deleted?: boolean;
}
