import { ApiProperty, } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class SortByDTO {
    @ApiProperty({
        example: 'first_name',
        description: 'Name of the sorting column',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly sort_by: string;

    @ApiProperty({
        enum: ['asc', 'desc'],
        title: 'Order of sorting',
        example: 'asc',
        default: 'asc',
        required: false
    })
    @IsString()
    @IsOptional()
    @IsIn(['asc', 'desc'])
    readonly sort_order: string;
}
