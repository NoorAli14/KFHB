import { ApiProperty } from '@nestjs/swagger';
import { CreatedOnDTO, STATUSES } from '@root/src/common';
import { IsIn, IsISO8601, IsOptional, IsString } from 'class-validator';
import { Type } from "class-transformer";

export class HolidayFilterDto {
    @ApiProperty({
        title: 'Holiday Date',
        example: '2020-10-10',
        description: 'Date of the holiday',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsISO8601({ strict: true })
    holiday_date: string;

    @ApiProperty({
        enum: STATUSES,
        example: STATUSES[0],
        description: 'Status of the Holiday',
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

