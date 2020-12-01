import { ApiProperty } from '@nestjs/swagger';
import { CreatedOnDTO, NUMBERS, USER_STATUSES } from '@root/src/common';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from "class-transformer";

export class UserFilterDto {
    @ApiProperty({
        title: 'Nationality ID',
        description: 'Nationality ID of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.NATIONALITY_ID_LENGTH)
    nationality_id: string;

    @ApiProperty({
        title: 'Gender',
        description: 'Gender of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    gender: string;

    @ApiProperty({
        title: 'First Name',
        description: 'First Name of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    first_name: string;

    @ApiProperty({
        title: 'Last Name',
        description: 'Last Name of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    last_name: string;

    @ApiProperty({
        title: 'Contact No',
        description: 'Contact No of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    contact_no: string;

    @ApiProperty({
        title: 'Email',
        description: 'Email of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
    email: string;

    @ApiProperty({
        enum: USER_STATUSES,
        example: USER_STATUSES[0],
        description: 'Status of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsIn(Object.keys(USER_STATUSES))
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

