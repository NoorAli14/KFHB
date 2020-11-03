import { ApiProperty } from '@nestjs/swagger';
import { CreatedOnDTO, NUMBERS, STATUSES } from '@root/src/common';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength, IsISO8601 } from 'class-validator';
import { Type } from "class-transformer";

export class LeaveFilterDto {
    @ApiProperty({
        title: 'User ID',
        description: 'User ID of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsUUID()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    user_id: string;

    @ApiProperty({
        title: 'Leave Type ID',
        description: 'Leave Type ID of the Leave',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsUUID()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    leave_type_id: string;

    @ApiProperty({
        title: 'Start Date',
        example: '2020-10-10',
        description: 'Leave start date',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsISO8601({ strict: true })
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    start_date: string;

    @ApiProperty({
        title: 'End Date',
        example: '2020-10-10',
        description: 'Leave end date',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsISO8601({ strict: true })
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    end_date: string;

    @ApiProperty({
        enum: STATUSES,
        example: STATUSES[0],
        description: 'Status of the Leave',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsIn(Object.keys(STATUSES))
    status: string;

    @ApiProperty({
        title: 'Created On',
        description: 'apply a range filter on the created_on column by providing a start and end value',
        required: false,
    })
    @IsOptional()
    @Type(() => CreatedOnDTO)
    created_on: CreatedOnDTO;
}

