import { ApiProperty } from '@nestjs/swagger';
import { USER_STATUSES } from '@common/constants';
import { PaginationDTO } from "@common/dtos";
import { User } from "@app/v1/users/user.entity";
import { IsOptional } from "class-validator";

export class Leave {
  @ApiProperty({
    title: 'Leave ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'User ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a12',
    description: 'Unique Identifier',
    required: false,
  })
  user_id: string;

  @ApiProperty({
    title: 'Leave type ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a11',
    description: 'Unique Identifier',
    required: false,
  })
  leave_type_id: string;

  @ApiProperty({
    example: '1947-08-14',
    required: true
  })
  start_date: string;

  @ApiProperty({
    example: '1947-08-14',
    required: true
  })
  end_date: string;

  @ApiProperty({
    required: false,
  })
  remarks: string;

  @ApiProperty({
    enum: USER_STATUSES,
    example: USER_STATUSES[0],
    description: 'Leave status',
    required: false,
  })
  status: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on: string;

  @ApiProperty({ required: false })
  created_by: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  updated_on: string;

  @ApiProperty({ required: false })
  updated_by: string;

  @ApiProperty({
    type: User,
    description: 'User object in detail',
    required: false,
  })
  @IsOptional()
  user?: User;
}

export class LeavePaginationList {
  @ApiProperty({
    type: [Leave],
    description: 'List of all Leaves.',
    required: true,
  })
  data: Leave[];

  @ApiProperty({
    type: PaginationDTO,
    description: 'Pagination meta data',
    required: true,
  })
  pagination: PaginationDTO;
}
