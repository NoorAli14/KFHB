import { ApiProperty } from '@nestjs/swagger';
import {CreatedOnDTO, NUMBERS, STATUSES} from '@root/src/common';
import {IsIn, IsOptional, IsString, MaxLength} from 'class-validator';
import {Type} from "@root/node_modules/class-transformer";

export class RoleFilterDto {
    @ApiProperty({
        title: 'Name',
        example: 'Admin',
        description: 'This field is for name of the role',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    name: string;

    @ApiProperty({
        title: 'Description',
        description: 'Description about the role',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    description: string;

    @ApiProperty({
        enum: STATUSES,
        example: STATUSES[0],
        description: 'Status of the role',
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

