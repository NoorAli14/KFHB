import { ApiProperty } from '@nestjs/swagger';
import { ATTACHMENT_TYPES } from '@common/constants';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class Attachment {
    @ApiProperty({
        title: 'Attachment ID',
        example: '3dfdecc1-a616-4817-a841-61d824d82a13',
        description: 'Unique Identifier',
    })
    readonly id: string;

    @ApiProperty({
        title: 'File name of the attachment',
        example: '20201022_1603369982284_passport_id.png',
    })
    readonly file_name: string

    @ApiProperty({
        title: 'File size of the attachment in kb',
        example: 4.9036458333,
    })
    readonly file_size: string

    @ApiProperty({
        enum: Object.values(ATTACHMENT_TYPES),
        example: Object.values(ATTACHMENT_TYPES)[0],
        description: 'Attachment Type',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(Object.values(ATTACHMENT_TYPES))
    readonly attachment_id: string;

    @ApiProperty({
        enum: ['ACTIVE', 'INACTIVE'],
        example: 'ACTIVE',
        description: 'Status of the attachment.',
        required: false,
    })
    status: string;

    @ApiProperty({
        required: false,
        description: 'timestamp without time zone',
    })
    created_on: Date;


    @ApiProperty({ required: false })
    created_by?: string;

    @ApiProperty({
        required: false,
        description: 'timestamp without time zone',
    })
    updated_on: Date;

    @ApiProperty({ required: false })
    updated_by: string;
}