import { ApiProperty } from '@nestjs/swagger';
import {CreatedOnDTO, NUMBERS, STATUSES} from '@root/src/common';
import {IsIn, IsISO8601, IsOptional, IsString, MaxLength} from 'class-validator';
import {Type} from "@root/node_modules/class-transformer";

export class HolidayFilterDto {
    @ApiProperty({
        title: 'Holiday Date',
        example: '2020-10-10',
        description: 'Date of the holiday',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsISO8601({strict: true})
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    holiday_date: string;

    @ApiProperty({
        title: 'Description',
        description: 'Description of the Holiday',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    description: string;

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

